declare module 'JSBI' {
  export class JSBI extends Array {
    private sign;
    private constructor();
    static BigInt(arg: number | string | boolean | object): JSBI;
    toDebugString(): string;
    toString(radix?: number): string;
    valueOf(): void;
    static toNumber(x: JSBI): number;
    static unaryMinus(x: JSBI): JSBI;
    static bitwiseNot(x: JSBI): JSBI;
    static exponentiate(x: JSBI, y: JSBI): JSBI;
    static multiply(x: JSBI, y: JSBI): JSBI;
    static divide(x: JSBI, y: JSBI): JSBI;
    static remainder(x: JSBI, y: JSBI): JSBI;
    static add(x: JSBI, y: JSBI): JSBI;
    static subtract(x: JSBI, y: JSBI): JSBI;
    static leftShift(x: JSBI, y: JSBI): JSBI;
    static signedRightShift(x: JSBI, y: JSBI): JSBI;
    static unsignedRightShift(): void;
    static lessThan(x: JSBI, y: JSBI): boolean;
    static lessThanOrEqual(x: JSBI, y: JSBI): boolean;
    static greaterThan(x: JSBI, y: JSBI): boolean;
    static greaterThanOrEqual(x: JSBI, y: JSBI): boolean;
    static equal(x: JSBI, y: JSBI): boolean;
    static notEqual(x: JSBI, y: JSBI): boolean;
    static bitwiseAnd(x: JSBI, y: JSBI): JSBI;
    static bitwiseXor(x: JSBI, y: JSBI): JSBI;
    static bitwiseOr(x: JSBI, y: JSBI): JSBI;
    static asIntN(n: number, x: JSBI): JSBI;
    static asUintN(n: number, x: JSBI): JSBI;
    static ADD(x: any, y: any): string | number | JSBI;
    static LT(x: any, y: any): boolean;
    static LE(x: any, y: any): boolean;
    static GT(x: any, y: any): boolean;
    static GE(x: any, y: any): boolean;
    static EQ(x: any, y: any): boolean;
    static NE(x: any, y: any): boolean;
    static DataViewGetBigInt64(
      dataview: DataView,
      byteOffset: number,
      littleEndian?: boolean,
    ): JSBI;
    static DataViewGetBigUint64(
      dataview: DataView,
      byteOffset: number,
      littleEndian?: boolean,
    ): JSBI;
    static DataViewSetBigInt64(
      dataview: DataView,
      byteOffset: number,
      value: JSBI,
      littleEndian?: boolean,
    ): void;
    static DataViewSetBigUint64(
      dataview: DataView,
      byteOffset: number,
      value: JSBI,
      littleEndian?: boolean,
    ): void;
  }
  export {};
}
