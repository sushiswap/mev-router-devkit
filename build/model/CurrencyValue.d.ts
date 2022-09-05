import { BigNumber } from 'ethers';
import { Currency } from './Currency';
export declare class CurrencyValue {
    readonly currency: Currency;
    readonly value: BigNumber;
    constructor(currency: Currency, value: BigNumber);
    static fromString(currency: Currency, value: string): CurrencyValue;
    toString(): string;
    format(): string;
    formatWithSymbol(): string;
    lt(currencyValue: CurrencyValue): boolean;
    map(fn: (value: BigNumber) => BigNumber): CurrencyValue;
}
export declare function formatCurrency(decimals: number, value: BigNumber): string;
