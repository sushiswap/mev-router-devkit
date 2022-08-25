import { BaseProvider } from '@ethersproject/providers/lib.esm/index.js';
import { ChainId, NATIVE_CURRENCY, WETH } from '../constants';
import { Cache, Token } from '../model';
import { TwapPair } from '../pair';

/**
 * Returns a Token object for given ERC20 token address or ETH currency symbol
 * @param provider
 * @param chainId Supported chains: Mainnet, Goerli
 * @param tokenAddressOrSymbol ERC20 token address or ETH currency symbol
 * @param cache
 * @returns Token object
 */
export async function getToken(
  provider: BaseProvider,
  chainId: ChainId,
  tokenAddressOrSymbol: string,
  cache?: Cache,
): Promise<Token> {
  let tokenAddress = null;
  if (tokenAddressOrSymbol.toLowerCase() === NATIVE_CURRENCY[chainId].symbol.toLowerCase()) {
    tokenAddress = WETH[chainId].toLowerCase();
  } else {
    tokenAddress = tokenAddressOrSymbol.toLowerCase();
  }

  if (cache) {
    const key = `getToken/${tokenAddress}`;
    const token = await cache.get(key);
    if (token) {
      return JSON.parse(token);
    }
  }

  try {
    const token = await TwapPair.getToken(provider, chainId, tokenAddress);
    if (token && cache) {
      await cache.set(`getToken/${token.address}`, JSON.stringify(token));
    }
    return token;
  } catch (error) {
    throw new Error(`Cannot find token: ${tokenAddress} on ${ChainId[chainId]}`);
  }
}
