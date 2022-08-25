import { Interface } from '@ethersproject/abi/lib.esm/index.js';
import { BaseProvider } from '@ethersproject/providers/lib.esm/index.js';
import { BigNumber } from 'ethers';
import { multicall } from './utils';
import { ChainId, ERC20_ABI, PAIR_ABI, READER_ABI, READER_ADDRESS } from './constants';
import { TwapFactory } from './factory.js';
import { Currency, Pair, toToken } from './model';

export abstract class TwapReader {
  private static READER_CODER: Interface = new Interface(READER_ABI);
  private static PAIR_CODER: Interface = new Interface([...ERC20_ABI, ...PAIR_ABI]);

  /**
   * Returns the pair for given tokens.
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @param currencyA The first token in pair
   * @param currencyB The second token in pair
   * @returns Pair
   */
  public static async getPair(
    provider: BaseProvider,
    chainId: ChainId,
    currencyA: Currency,
    currencyB: Currency,
  ): Promise<Pair | undefined> {
    const tokenA = toToken(currencyA);
    const tokenB = toToken(currencyB);

    const [first, second] = BigNumber.from(tokenA.address).lt(BigNumber.from(tokenB.address))
      ? [tokenA, tokenB]
      : [tokenB, tokenA];

    const pairAddress = await TwapFactory.getPairAddress(provider, chainId, first, second);

    if (pairAddress) {
      const state = await this._getPairParameters(provider, chainId, pairAddress);

      return new Pair(pairAddress, first, second, state);
    }
  }

  private static async _getPairParameters(
    provider: BaseProvider,
    chainId: ChainId,
    pairAddress: string,
  ) {
    const results = await multicall(provider, chainId, [
      {
        target: READER_ADDRESS[chainId],
        callData: this.READER_CODER.encodeFunctionData('getPairParameters', [pairAddress]),
      },
      {
        target: pairAddress,
        callData: this.PAIR_CODER.encodeFunctionData('totalSupply'),
      },
    ]);

    const [, reserve0, reserve1, price, mintFee, burnFee, swapFee] =
      this.READER_CODER.decodeFunctionResult('getPairParameters', results[0]);
    const totalSupply = this.PAIR_CODER.decodeFunctionResult('totalSupply', results[1])[0];

    return {
      reserve0,
      reserve1,
      price,
      mintFee,
      burnFee,
      swapFee,
      totalSupply,
    };
  }
}
