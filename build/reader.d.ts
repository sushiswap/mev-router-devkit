import { BaseProvider } from '@ethersproject/providers/lib.esm/index.js';
import { ChainId } from './constants';
import { Currency, Pair } from './model';
export declare abstract class TwapReader {
    private static READER_CODER;
    private static PAIR_CODER;
    static getPair(provider: BaseProvider, chainId: ChainId, currencyA: Currency, currencyB: Currency): Promise<Pair | undefined>;
    private static _getPairParameters;
}
