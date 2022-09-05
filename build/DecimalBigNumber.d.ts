import { BigNumber } from '@ethersproject/bignumber/lib.esm/index.js';
export declare function assert(value: boolean, message?: string): asserts value;
export declare function assert<T>(value: T | null | undefined, message?: string): asserts value is T;
export declare class DecimalBigNumber {
    private _decimals;
    private _value;
    constructor(value: string, decimals?: number);
    constructor(value: BigNumber, decimals: number);
    private _inferDecimalAmount;
    private _setDecimalAmount;
    private _ensurePositive;
    toBigNumber(decimals?: number): BigNumber;
    toString({ decimals, trim, format, }?: {
        trim?: boolean;
        format?: boolean;
        decimals?: number;
    }): string;
    toApproxNumber(): number;
    eq(value: DecimalBigNumber | string): boolean;
    sub(value: DecimalBigNumber | string): DecimalBigNumber;
    add(value: DecimalBigNumber | string): DecimalBigNumber;
    gt(value: DecimalBigNumber | string): boolean;
    lt(value: DecimalBigNumber | string): boolean;
    mul(value: DecimalBigNumber | string): DecimalBigNumber;
    div(value: DecimalBigNumber | string, decimals?: number): DecimalBigNumber;
}
