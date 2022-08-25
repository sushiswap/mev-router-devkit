import { Interface } from '@ethersproject/abi';
import { BaseProvider } from '@ethersproject/providers';
import { ChainId, ORACLE_ABI } from './constants';
import { multicall } from './utils';

export abstract class TwapOracle {
  private static ORACLE_CODER: Interface = new Interface(ORACLE_ABI);

  /**
   * Returns decimals for token0 and token1 from TwapOracle contract
   * @param provider A blockchain network connection provider
   * @param chainId Supported chains: Mainnet, Goerli
   * @param oracleAddress TwapOracle contract address
   * @returns Decimals for token0 and token1
   */
  public static async getTokensDecimals(
    provider: BaseProvider,
    chainId: ChainId,
    oracleAddress: string,
  ): Promise<[number, number]> {
    const results = await multicall(provider, chainId, [
      {
        target: oracleAddress,
        callData: this.ORACLE_CODER.encodeFunctionData('xDecimals'),
      },
      {
        target: oracleAddress,
        callData: this.ORACLE_CODER.encodeFunctionData('yDecimals'),
      },
    ]);

    const token0Decimals = this.ORACLE_CODER.decodeFunctionResult('xDecimals', results[0])[0];
    const token1Decimals = this.ORACLE_CODER.decodeFunctionResult('yDecimals', results[1])[0];

    return [token0Decimals, token1Decimals];
  }
}
