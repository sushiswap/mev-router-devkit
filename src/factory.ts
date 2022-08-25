import { Interface } from '@ethersproject/abi/lib.esm/index.js';
import { BaseProvider } from '@ethersproject/providers/lib.esm/index.js';
import { multicall } from './utils';
import { ADDRESS_ZERO, ChainId, FACTORY_ABI, FACTORY_ADDRESS } from './constants';
import { Currency, toToken, Cache } from './model';

export abstract class TwapFactory {
  private static FACTORY_CODER: Interface = new Interface(FACTORY_ABI);

  /**
   * Returns the pair address for given tokens
   * @param provider An abstraction of a connection to the Ethereum network
   * @param chainId Supported chains: Mainnet, Goerli
   * @param first The first token in pair
   * @param second The second token in pair
   * @param cache
   * @param ttlSeconds TTL in seconds that object is stored in caching system
   * @returns Pair address normalized to lowercase
   */
  public static async getPairAddress(
    provider: BaseProvider,
    chainId: ChainId,
    first: Currency,
    second: Currency,
    cache?: Cache,
    ttlSeconds?: number,
  ): Promise<string | undefined> {
    const firstToken = toToken(first);
    const secondToken = toToken(second);
    if (firstToken === secondToken) {
      throw new Error('Pair for identical tokens');
    }

    const key = `getPairAddress/${first.symbol}/${second.symbol}`;
    if (cache) {
      const pairAddress = await cache.get(key);
      if (pairAddress) {
        return pairAddress;
      }
    }

    const results = await multicall(provider, chainId, [
      {
        target: FACTORY_ADDRESS[chainId],
        callData: this.FACTORY_CODER.encodeFunctionData('getPair', [
          firstToken.address,
          secondToken.address,
        ]),
      },
    ]);

    const decodedPairAddress = this.FACTORY_CODER.decodeFunctionResult('getPair', results[0])[0];
    const pairAddress = decodedPairAddress !== ADDRESS_ZERO ? decodedPairAddress : undefined;

    if (pairAddress && cache) {
      await cache.set(key, pairAddress, ttlSeconds);
    }
    return pairAddress?.toLowerCase();
  }

  /**
   * Returns a number of pairs in the TwapFactory contract
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @returns Number of pairs
   */
  public static async getPairCount(provider: BaseProvider, chainId: ChainId): Promise<number> {
    const results = await multicall(provider, chainId, [
      {
        target: FACTORY_ADDRESS[chainId],
        callData: this.FACTORY_CODER.encodeFunctionData('allPairsLength'),
      },
    ]);

    const pairsLength = this.FACTORY_CODER.decodeFunctionResult('allPairsLength', results[0])[0];

    return pairsLength?.toNumber();
  }

  /**
   * Returns a pair address for given id
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @param id Id of a pair in TwapFactory contract
   * @returns Pair address normalized to lowercase
   */
  public static async getPairAddressById(
    provider: BaseProvider,
    chainId: ChainId,
    id: number,
  ): Promise<string> {
    const results = await multicall(provider, chainId, [
      {
        target: FACTORY_ADDRESS[chainId],
        callData: this.FACTORY_CODER.encodeFunctionData('allPairs', [id]),
      },
    ]);

    const pairAddress = this.FACTORY_CODER.decodeFunctionResult('allPairs', results[0])[0];

    return pairAddress?.toLowerCase();
  }
}
