import { ChainId } from '../constants';
import { Currency } from './Currency';
export declare class Token extends Currency {
    readonly chainId: ChainId;
    readonly address: string;
    readonly name: string;
    readonly symbol: string;
    readonly decimals: number;
    constructor(chainId: ChainId, address: string, name: string, symbol: string, decimals: number);
}
export declare function isToken(currency: Currency): currency is Token;
export declare function toToken(currency: Currency): Token;
