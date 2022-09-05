import { BaseProvider } from '@ethersproject/providers';
import { ChainId } from './constants';
export declare abstract class TwapOracle {
    private static ORACLE_CODER;
    static getTokensDecimals(provider: BaseProvider, chainId: ChainId, oracleAddress: string): Promise<[number, number]>;
}
