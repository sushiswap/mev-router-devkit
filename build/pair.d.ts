import { BaseProvider } from '@ethersproject/providers/lib.esm/index.js';
import { ChainId } from './constants';
import { Token } from './model';
export declare abstract class TwapPair {
    private static PAIR_CODER;
    private static ERC20_CODER;
    static getToken(provider: BaseProvider, chainId: ChainId, tokenAddress: string): Promise<Token>;
    static getTokenAddresses(provider: BaseProvider, chainId: ChainId, pairAddress: string): Promise<[string, string]>;
    static getOracleAddress(provider: BaseProvider, chainId: ChainId, pairAddress: string): Promise<string>;
    private static getTokenDecimals;
}
