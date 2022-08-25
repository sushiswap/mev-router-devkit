import { Interface } from '@ethersproject/abi/lib.esm/index.js';
import { BigNumber } from '@ethersproject/bignumber/lib.esm/index.js';
import { BaseProvider } from '@ethersproject/providers/lib.esm/index.js';
import {
  ChainId,
  DEFAULT_SETTINGS,
  DELAY_ABI,
  DELAY_ADDRESS,
  EXECUTE_BUY_GAS_LIMIT,
  EXECUTE_DEPOSIT_GAS_LIMIT,
  EXECUTE_SELL_GAS_LIMIT,
  EXECUTE_WITHDRAW_GAS_LIMIT,
  NATIVE_CURRENCY,
  SETTINGS_DENOMINATORS,
} from './constants';
import { CurrencyValue, Pair, toToken } from './model';
import {
  areTokensSorted,
  getInputValueWithSlippage,
  getOutputValueWithSlippage,
  makeFloatEncodable,
  sortTokens,
  multicall,
} from './utils';

/**
 * Options for producing call parameters.
 */
export interface CallOptions {
  /**
   * Gas price. When not specified, gas price will be obtained from TwapDelay contract.
   */
  gasPrice?: BigNumber;

  /**
   * Slippage tolerance denominator. Default slippageToleranceDenominator = 1000.
   */
  slippageToleranceDenominator?: number;

  /**
   * Gas price multiplier per mille. Default gasPriceMultiplier = 1050.
   */
  gasPriceMultiplier?: number;

  /**
   * Gas price denominator. Default gasPriceDenominator = 1000.
   */
  gasPriceDenominator?: number;

  /**
   * Deposit slippage denominator used in deposit call. Default depostiSlippageDenominator = 1000.
   */
  depositSlippageDenominator?: number;

  /**
   * Additional gas prepaid for execution. Default gasLimitOverpay = 20000.
   */
  gasLimitOverpay?: number;

  /**
   * Submit deadline relative to now in seconds. Default submitDeadline = 86 400 seconds = 24h.
   */
  submitDeadline?: number;
}

export abstract class TwapDelay {
  private static DELAY_CODER: Interface = new Interface(DELAY_ABI);

  /**
   * Produces the contract address and on-chain method name to call and the hex encoded parameters to pass as arguments for a given buy call.
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @param to The account that should receive the output.
   * @param input The input token, either Ether or an ERC-20
   * @param output The exact output token, either Ether or an ERC-20
   * @param slippageTolerance How much the execution price is allowed to move unfavorably from the trade execution price.
   * @param options Options for the call parameters
   * @returns Contract address, method name, calldata and value.
   */
  public static async getBuyCallParameters(
    provider: BaseProvider,
    chainId: ChainId,
    to: string,
    input: CurrencyValue,
    output: CurrencyValue,
    slippageTolerance: number,
    options?: CallOptions,
  ): Promise<{ contractAddress: string; methodName: string; calldata: string; value: BigNumber }> {
    const tokenIn = toToken(input.currency);
    const tokenOut = toToken(output.currency);
    const valueIn = getInputValueWithSlippage(
      input,
      slippageTolerance,
      options?.slippageToleranceDenominator ?? SETTINGS_DENOMINATORS.slippageTolerance,
    ).value;
    const valueOut = output.value;
    const wrapUnwrap =
      input.currency === NATIVE_CURRENCY[chainId] || output.currency === NATIVE_CURRENCY[chainId];
    const etherValue = input.currency === NATIVE_CURRENCY[chainId] ? valueIn : 0;
    const safeGasLimit =
      EXECUTE_BUY_GAS_LIMIT + (options?.gasLimitOverpay ?? DEFAULT_SETTINGS.gasLimitOverpay);
    const nowSeconds = Math.floor(Date.now() / 1000);
    const delayGasPrice = options?.gasPrice ?? (await this.getGasPrice(provider, chainId));
    const safeGasPrice = delayGasPrice
      .mul(options?.gasPriceMultiplier ?? DEFAULT_SETTINGS.gasPriceMultiplier)
      .div(options?.gasPriceDenominator ?? SETTINGS_DENOMINATORS.gasPriceMultiplier);
    const gasPrepay = safeGasPrice.mul(safeGasLimit);

    return {
      contractAddress: DELAY_ADDRESS[chainId],
      methodName: 'buy',
      calldata: this.DELAY_CODER.encodeFunctionData('buy', [
        {
          tokenIn: tokenIn.address,
          tokenOut: tokenOut.address,
          amountInMax: valueIn,
          amountOut: valueOut,
          wrapUnwrap: wrapUnwrap,
          to: to,
          gasLimit: safeGasLimit,
          submitDeadline: nowSeconds + (options?.submitDeadline ?? DEFAULT_SETTINGS.submitDeadline),
        },
      ]),
      value: gasPrepay.add(etherValue),
    };
  }

  /**
   * Produces the contract address and on-chain method name to call and the hex encoded parameters to pass as arguments for a given sell call.
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @param to The account that should receive the output.
   * @param input The exact input token, either Ether or an ERC-20
   * @param output The output token, either Ether or an ERC-20
   * @param slippageTolerance How much the execution price is allowed to move unfavorably from the trade execution price.
   * @param options Options for the call parameters
   * @returns Contract address, method name, calldata and value
   */
  public static async getSellCallParameters(
    provider: BaseProvider,
    chainId: ChainId,
    to: string,
    input: CurrencyValue,
    output: CurrencyValue,
    slippageTolerance: number,
    options?: CallOptions,
  ): Promise<{ contractAddress: string; methodName: string; calldata: string; value: BigNumber }> {
    const tokenIn = toToken(input.currency);
    const tokenOut = toToken(output.currency);
    const valueIn = input.value;
    const valueOut = getOutputValueWithSlippage(
      output,
      slippageTolerance,
      options?.slippageToleranceDenominator ?? SETTINGS_DENOMINATORS.slippageTolerance,
    ).value;
    const wrapUnwrap =
      input.currency === NATIVE_CURRENCY[chainId] || output.currency === NATIVE_CURRENCY[chainId];
    const etherValue = input.currency === NATIVE_CURRENCY[chainId] ? input.value : 0;
    const safeGasLimit =
      EXECUTE_SELL_GAS_LIMIT + (options?.gasLimitOverpay ?? DEFAULT_SETTINGS.gasLimitOverpay);
    const nowSeconds = Math.floor(Date.now() / 1000);
    const delayGasPrice = options?.gasPrice ?? (await this.getGasPrice(provider, chainId));
    const safeGasPrice = delayGasPrice
      .mul(options?.gasPriceMultiplier ?? DEFAULT_SETTINGS.gasPriceMultiplier)
      .div(options?.gasPriceDenominator ?? SETTINGS_DENOMINATORS.gasPriceMultiplier);
    const gasPrepay = safeGasPrice.mul(safeGasLimit);

    return {
      contractAddress: DELAY_ADDRESS[chainId],
      methodName: 'sell',
      calldata: this.DELAY_CODER.encodeFunctionData('sell', [
        {
          tokenIn: tokenIn.address,
          tokenOut: tokenOut.address,
          amountIn: valueIn,
          amountOutMin: valueOut,
          wrapUnwrap: wrapUnwrap,
          to: to,
          gasLimit: safeGasLimit,
          submitDeadline: nowSeconds + (options?.submitDeadline ?? DEFAULT_SETTINGS.submitDeadline),
        },
      ]),
      value: gasPrepay.add(etherValue),
    };
  }

  /**
   * Produces the contract address and on-chain method name to call and the hex encoded parameters to pass as arguments for a given withdraw call.
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @param to The account that should receive the output.
   * @param firstValue The first token to withdraw
   * @param secondValue The second token to withdraw
   * @param liquidity
   * @param options Options for the call parameters
   * @returns Contract address, method name, calldata and value
   */
  public static async getWithdrawCallParameters(
    provider: BaseProvider,
    chainId: ChainId,
    to: string,
    firstValue: CurrencyValue,
    secondValue: CurrencyValue,
    liquidity: BigNumber,
    options?: CallOptions,
  ): Promise<{ contractAddress: string; methodName: string; calldata: string; value: BigNumber }> {
    const tokenA = toToken(firstValue.currency);
    const tokenB = toToken(secondValue.currency);
    const [token0, token1] = sortTokens(tokenA, tokenB);
    const unwrap =
      firstValue.currency === NATIVE_CURRENCY[chainId] ||
      secondValue.currency === NATIVE_CURRENCY[chainId];
    const safeGasLimit =
      EXECUTE_WITHDRAW_GAS_LIMIT + (options?.gasLimitOverpay ?? DEFAULT_SETTINGS.gasLimitOverpay);
    const nowSeconds = Math.floor(Date.now() / 1000);
    const delayGasPrice = options?.gasPrice ?? (await this.getGasPrice(provider, chainId));
    const safeGasPrice = delayGasPrice
      .mul(options?.gasPriceMultiplier ?? DEFAULT_SETTINGS.gasPriceMultiplier)
      .div(options?.gasPriceDenominator ?? SETTINGS_DENOMINATORS.gasPriceMultiplier);
    const gasPrepay = safeGasPrice.mul(safeGasLimit);
    return {
      contractAddress: DELAY_ADDRESS[chainId],
      methodName: 'withdraw',
      calldata: this.DELAY_CODER.encodeFunctionData('withdraw', [
        {
          token0: token0.address,
          token1: token1.address,
          liquidity: liquidity,
          amount0Min: BigNumber.from(0),
          amount1Min: BigNumber.from(0),
          unwrap: unwrap,
          to: to,
          gasLimit: safeGasLimit,
          submitDeadline: nowSeconds + (options?.submitDeadline ?? DEFAULT_SETTINGS.submitDeadline),
        },
      ]),
      value: gasPrepay,
    };
  }

  /**
   * Produces the contract address and on-chain method name to call and the hex encoded parameters to pass as arguments for a given deposit call.
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @param to The account that should receive the output
   * @param firstValue The first token to deposit
   * @param secondValue The second token to deposit
   * @param slippageTolerance How much the execution price is allowed to move unfavorably from the trade execution price.
   * @param pair
   * @param swapOnDeposit Whether to perform a swap on non-proportional deposits
   * @param options Options for the call parameters
   * @returns Contract address, method name, calldata and value
   */
  public static async getDepositCallParameters(
    provider: BaseProvider,
    chainId: ChainId,
    to: string,
    firstValue: CurrencyValue,
    secondValue: CurrencyValue,
    slippageTolerance: number,
    pair: Pair,
    swapOnDeposit: boolean,
    options?: CallOptions,
  ): Promise<{ contractAddress: string; methodName: string; calldata: string; value: BigNumber }> {
    const tokenA = toToken(firstValue.currency);
    const tokenB = toToken(secondValue.currency);
    const [token0, token1, currencyValue0, currencyValue1] = areTokensSorted(tokenA, tokenB)
      ? [tokenA, tokenB, firstValue, secondValue]
      : [tokenB, tokenA, secondValue, firstValue];
    const [value0, value1] = [currencyValue0.value, currencyValue1.value];
    const wrap =
      firstValue.currency === NATIVE_CURRENCY[chainId] ||
      secondValue.currency === NATIVE_CURRENCY[chainId];
    const etherValue =
      firstValue.currency === NATIVE_CURRENCY[chainId]
        ? firstValue.value
        : secondValue.currency === NATIVE_CURRENCY[chainId]
        ? secondValue.value
        : 0;
    const safeGasLimit =
      EXECUTE_DEPOSIT_GAS_LIMIT + (options?.gasLimitOverpay ?? DEFAULT_SETTINGS.gasLimitOverpay);
    const nowSeconds = Math.floor(Date.now() / 1000);
    const delayGasPrice = options?.gasPrice ?? (await this.getGasPrice(provider, chainId));
    const safeGasPrice = delayGasPrice
      .mul(options?.gasPriceMultiplier ?? DEFAULT_SETTINGS.gasPriceMultiplier)
      .div(options?.gasPriceDenominator ?? SETTINGS_DENOMINATORS.gasPriceMultiplier);
    const gasPrepay = safeGasPrice.mul(safeGasLimit);
    const initialPrice = pair.getPrice();

    return {
      contractAddress: DELAY_ADDRESS[chainId],
      methodName: 'deposit',
      calldata: this.DELAY_CODER.encodeFunctionData('deposit', [
        {
          token0: token0.address,
          token1: token1.address,
          amount0: value0,
          amount1: value1,
          minSwapPrice: makeFloatEncodable(
            initialPrice
              .mul(
                (options?.depositSlippageDenominator ??
                  SETTINGS_DENOMINATORS.depositSlippageTolerance) - slippageTolerance,
              )
              .div(
                options?.depositSlippageDenominator ??
                  SETTINGS_DENOMINATORS.depositSlippageTolerance,
              ),
          ),
          maxSwapPrice: makeFloatEncodable(
            initialPrice
              .mul(
                (options?.depositSlippageDenominator ??
                  SETTINGS_DENOMINATORS.depositSlippageTolerance) + slippageTolerance,
              )
              .div(
                options?.depositSlippageDenominator ??
                  SETTINGS_DENOMINATORS.depositSlippageTolerance,
              ),
          ),
          wrap: wrap,
          swap: swapOnDeposit,
          to: to,
          gasLimit: safeGasLimit,
          submitDeadline: nowSeconds + (options?.submitDeadline ?? DEFAULT_SETTINGS.submitDeadline),
        },
      ]),
      value: gasPrepay.add(etherValue),
    };
  }

  /**
   * Returns the gas price
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @returns Gas price
   */
  public static async getGasPrice(provider: BaseProvider, chainId: ChainId): Promise<BigNumber> {
    const results = await multicall(provider, chainId, [
      {
        target: DELAY_ADDRESS[chainId],
        callData: this.DELAY_CODER.encodeFunctionData('gasPrice'),
      },
    ]);

    const gasPrice = this.DELAY_CODER.decodeFunctionResult('gasPrice', results[0])[0];

    return BigNumber.from(gasPrice);
  }

  /**
   * Returns the order statuses for given order ids.
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @param orderIds Order ids array
   * @returns Order statuses
   */
  public static async getOrderStatuses(
    provider: BaseProvider,
    chainId: ChainId,
    orderIds: number[],
  ): Promise<{ orderId: number; status: number }[]> {
    const calls: { target: string; callData: any }[] = [];
    orderIds.forEach((orderId) =>
      calls.push({
        target: DELAY_ADDRESS[chainId],
        callData: this.DELAY_CODER.encodeFunctionData('getOrderStatus', [orderId]),
      }),
    );

    const results = await multicall(provider, chainId, calls);

    const orderStatuses: { orderId: number; status: number }[] = [];
    for (let i = 0; i < orderIds.length; i++) {
      orderStatuses.push({
        orderId: orderIds[i],
        status: this.DELAY_CODER.decodeFunctionResult('getOrderStatus', results[i])[0],
      });
    }
    return orderStatuses;
  }

  /**
   * Returns the order status for given order id.
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @param orderId Id of the order
   * @returns Order status
   */
  public static async getOrderStatus(
    provider: BaseProvider,
    chainId: ChainId,
    orderId: number,
  ): Promise<number> {
    const results = await multicall(provider, chainId, [
      {
        target: DELAY_ADDRESS[chainId],
        callData: this.DELAY_CODER.encodeFunctionData('getOrderStatus', [orderId]),
      },
    ]);

    const orderStatus = this.DELAY_CODER.decodeFunctionResult('getOrderStatus', results[0])[0];

    return orderStatus;
  }
}
