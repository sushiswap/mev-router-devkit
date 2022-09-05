import { Currency } from '../model';
export interface PairsItem {
    address: string;
    tokens: Currency[];
}
export declare const MAINNET_PAIRS: PairsItem[];
export declare const GOERLI_PAIRS: PairsItem[];
export declare const GANACHE_PAIRS: PairsItem[];
export declare const PAIRS: PairsItem[];
export declare const PAIRS_BY_CHAIN: {
    1: PairsItem[];
    5: PairsItem[];
    1337: PairsItem[];
};
