import { Interface } from '@ethersproject/abi/lib.esm/index.js';
import { BigNumber } from '@ethersproject/bignumber/lib.esm/index.js';
import { DEFAULT_SETTINGS, DELAY_ABI, DELAY_ADDRESS, EXECUTE_BUY_GAS_LIMIT, EXECUTE_DEPOSIT_GAS_LIMIT, EXECUTE_SELL_GAS_LIMIT, EXECUTE_WITHDRAW_GAS_LIMIT, NATIVE_CURRENCY, SETTINGS_DENOMINATORS, } from './constants';
import { toToken } from './model';
import { areTokensSorted, getInputValueWithSlippage, getOutputValueWithSlippage, makeFloatEncodable, sortTokens, multicall, } from './utils';
export class TwapDelay {
    static async getBuyCallParameters(provider, chainId, to, input, output, slippageTolerance, options) {
        const tokenIn = toToken(input.currency);
        const tokenOut = toToken(output.currency);
        const valueIn = getInputValueWithSlippage(input, slippageTolerance, options?.slippageToleranceDenominator ?? SETTINGS_DENOMINATORS.slippageTolerance).value;
        const valueOut = output.value;
        const wrapUnwrap = input.currency === NATIVE_CURRENCY[chainId] || output.currency === NATIVE_CURRENCY[chainId];
        const etherValue = input.currency === NATIVE_CURRENCY[chainId] ? valueIn : 0;
        const safeGasLimit = EXECUTE_BUY_GAS_LIMIT + (options?.gasLimitOverpay ?? DEFAULT_SETTINGS.gasLimitOverpay);
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
    static async getSellCallParameters(provider, chainId, to, input, output, slippageTolerance, options) {
        const tokenIn = toToken(input.currency);
        const tokenOut = toToken(output.currency);
        const valueIn = input.value;
        const valueOut = getOutputValueWithSlippage(output, slippageTolerance, options?.slippageToleranceDenominator ?? SETTINGS_DENOMINATORS.slippageTolerance).value;
        const wrapUnwrap = input.currency === NATIVE_CURRENCY[chainId] || output.currency === NATIVE_CURRENCY[chainId];
        const etherValue = input.currency === NATIVE_CURRENCY[chainId] ? input.value : 0;
        const safeGasLimit = EXECUTE_SELL_GAS_LIMIT + (options?.gasLimitOverpay ?? DEFAULT_SETTINGS.gasLimitOverpay);
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
    static async getWithdrawCallParameters(provider, chainId, to, firstValue, secondValue, liquidity, options) {
        const tokenA = toToken(firstValue.currency);
        const tokenB = toToken(secondValue.currency);
        const [token0, token1] = sortTokens(tokenA, tokenB);
        const unwrap = firstValue.currency === NATIVE_CURRENCY[chainId] ||
            secondValue.currency === NATIVE_CURRENCY[chainId];
        const safeGasLimit = EXECUTE_WITHDRAW_GAS_LIMIT + (options?.gasLimitOverpay ?? DEFAULT_SETTINGS.gasLimitOverpay);
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
    static async getDepositCallParameters(provider, chainId, to, firstValue, secondValue, slippageTolerance, pair, swapOnDeposit, options) {
        const tokenA = toToken(firstValue.currency);
        const tokenB = toToken(secondValue.currency);
        const [token0, token1, currencyValue0, currencyValue1] = areTokensSorted(tokenA, tokenB)
            ? [tokenA, tokenB, firstValue, secondValue]
            : [tokenB, tokenA, secondValue, firstValue];
        const [value0, value1] = [currencyValue0.value, currencyValue1.value];
        const wrap = firstValue.currency === NATIVE_CURRENCY[chainId] ||
            secondValue.currency === NATIVE_CURRENCY[chainId];
        const etherValue = firstValue.currency === NATIVE_CURRENCY[chainId]
            ? firstValue.value
            : secondValue.currency === NATIVE_CURRENCY[chainId]
                ? secondValue.value
                : 0;
        const safeGasLimit = EXECUTE_DEPOSIT_GAS_LIMIT + (options?.gasLimitOverpay ?? DEFAULT_SETTINGS.gasLimitOverpay);
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
                    minSwapPrice: makeFloatEncodable(initialPrice
                        .mul((options?.depositSlippageDenominator ??
                        SETTINGS_DENOMINATORS.depositSlippageTolerance) - slippageTolerance)
                        .div(options?.depositSlippageDenominator ??
                        SETTINGS_DENOMINATORS.depositSlippageTolerance)),
                    maxSwapPrice: makeFloatEncodable(initialPrice
                        .mul((options?.depositSlippageDenominator ??
                        SETTINGS_DENOMINATORS.depositSlippageTolerance) + slippageTolerance)
                        .div(options?.depositSlippageDenominator ??
                        SETTINGS_DENOMINATORS.depositSlippageTolerance)),
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
    static async getGasPrice(provider, chainId) {
        const results = await multicall(provider, chainId, [
            {
                target: DELAY_ADDRESS[chainId],
                callData: this.DELAY_CODER.encodeFunctionData('gasPrice'),
            },
        ]);
        const gasPrice = this.DELAY_CODER.decodeFunctionResult('gasPrice', results[0])[0];
        return BigNumber.from(gasPrice);
    }
    static async getOrderStatuses(provider, chainId, orderIds) {
        const calls = [];
        orderIds.forEach((orderId) => calls.push({
            target: DELAY_ADDRESS[chainId],
            callData: this.DELAY_CODER.encodeFunctionData('getOrderStatus', [orderId]),
        }));
        const results = await multicall(provider, chainId, calls);
        const orderStatuses = [];
        for (let i = 0; i < orderIds.length; i++) {
            orderStatuses.push({
                orderId: orderIds[i],
                status: this.DELAY_CODER.decodeFunctionResult('getOrderStatus', results[i])[0],
            });
        }
        return orderStatuses;
    }
    static async getOrderStatus(provider, chainId, orderId) {
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
TwapDelay.DELAY_CODER = new Interface(DELAY_ABI);
//# sourceMappingURL=delay.js.map