import { BaseProvider } from '@ethersproject/providers/lib.esm/index.js';
import { ChainId } from './constants';
import { Currency, Cache } from './model';
export declare abstract class TwapFactory {
    private static FACTORY_CODER;
    static getPairAddress(provider: BaseProvider, chainId: ChainId, first: Currency, second: Currency, cache?: Cache, ttlSeconds?: number): Promise<string | undefined>;
    static getPairCount(provider: BaseProvider, chainId: ChainId): Promise<number>;
    static getPairAddressById(provider: BaseProvider, chainId: ChainId, id: number): Promise<string>;
}
