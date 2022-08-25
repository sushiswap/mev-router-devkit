import { Interface } from '@ethersproject/abi/lib.esm/index.js';
import { BaseProvider } from '@ethersproject/providers/lib.esm/index.js';
import { ChainId, ERC20_ABI, PAIR_ABI } from './constants';
import { TwapFactory } from './factory.js';
import { Token } from './model';
import { TwapOracle } from './oracle';
import { areAddressesEqual, multicall } from './utils';

export abstract class TwapPair {
  private static PAIR_CODER: Interface = new Interface(PAIR_ABI);
  private static ERC20_CODER: Interface = new Interface(ERC20_ABI);

  /**
   * Returns a Token object for given ERC20 token address
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @param tokenAddress ERC20 token address
   * @returns Token object
   */
  public static async getToken(
    provider: BaseProvider,
    chainId: ChainId,
    tokenAddress: string,
  ): Promise<Token> {
    const normalizedTokenAddress = tokenAddress.toLowerCase();
    const results = await multicall(provider, chainId, [
      {
        target: normalizedTokenAddress,
        callData: this.ERC20_CODER.encodeFunctionData('name'),
      },
      {
        target: normalizedTokenAddress,
        callData: this.ERC20_CODER.encodeFunctionData('symbol'),
      },
      {
        target: normalizedTokenAddress,
        callData: this.ERC20_CODER.encodeFunctionData('decimals'),
      },
    ]);

    const name = this.ERC20_CODER.decodeFunctionResult('name', results[0])[0];
    const symbol = this.ERC20_CODER.decodeFunctionResult('symbol', results[1])[0];
    let decimals = this.ERC20_CODER.decodeFunctionResult('decimals', results[2])[0];

    if (!decimals) {
      decimals = await this.getTokenDecimals(provider, chainId, normalizedTokenAddress);
    }

    const token = new Token(chainId, normalizedTokenAddress, name, symbol, decimals);

    return token;
  }

  /**
   * Returns token0 and token1 addresses from TwapPair contract
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @param pairAddress TwapPair contract address
   * @returns Token0 and token1 addresses normalized to lowercase
   */
  public static async getTokenAddresses(
    provider: BaseProvider,
    chainId: ChainId,
    pairAddress: string,
  ): Promise<[string, string]> {
    const results = await multicall(provider, chainId, [
      {
        target: pairAddress,
        callData: this.PAIR_CODER.encodeFunctionData('token0'),
      },
      {
        target: pairAddress,
        callData: this.PAIR_CODER.encodeFunctionData('token1'),
      },
    ]);

    const token0Address = this.PAIR_CODER.decodeFunctionResult('token0', results[0])[0];
    const token1Address = this.PAIR_CODER.decodeFunctionResult('token1', results[1])[0];

    return [token0Address?.toLowerCase(), token1Address?.toLowerCase()];
  }

  /**
   * Returns an oracle address from TwapPair contract
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @param pairAddress TwapPair contract address
   * @returns Oracle address normalized to lowercase
   */
  public static async getOracleAddress(
    provider: BaseProvider,
    chainId: ChainId,
    pairAddress: string,
  ): Promise<string> {
    const results = await multicall(provider, chainId, [
      {
        target: pairAddress,
        callData: this.PAIR_CODER.encodeFunctionData('oracle'),
      },
    ]);

    const oracleAddress = this.PAIR_CODER.decodeFunctionResult('oracle', results[0])[0];

    return oracleAddress?.toLowerCase();
  }

  /**
   * Returns token decimals from TwapOracle contract
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @param tokenAddress ERC20 token address
   * @returns Token decimals
   */
  private static async getTokenDecimals(
    provider: BaseProvider,
    chainId: ChainId,
    tokenAddress: string,
  ): Promise<number> {
    const pairLength = await TwapFactory.getPairCount(provider, chainId);

    for (let i = 0; i < pairLength; i++) {
      const pairAddress = await TwapFactory.getPairAddressById(provider, chainId, i);
      const [token0Address, token1Address] = await this.getTokenAddresses(
        provider,
        chainId,
        pairAddress,
      );

      if (
        areAddressesEqual(tokenAddress, token0Address) ||
        areAddressesEqual(tokenAddress, token1Address)
      ) {
        const oracleAddress = await this.getOracleAddress(provider, chainId, pairAddress);
        const [token0Decimals, token1Decimals] = await TwapOracle.getTokensDecimals(
          provider,
          chainId,
          oracleAddress,
        );
        return areAddressesEqual(tokenAddress, token0Address) ? token0Decimals : token1Decimals;
      }
    }

    throw Error(`No decimals found for token: ${tokenAddress} on ${ChainId[chainId]}`);
  }
}
