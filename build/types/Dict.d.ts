import { LooseRecord } from './types';
export declare const entries: <T extends LooseRecord<unknown>>(value: T) => { [K in keyof T]: [K, T[K]]; }[keyof T][];
export declare const keys: <T extends LooseRecord<unknown>>(value: T) => (keyof T)[];
export declare const values: <T extends LooseRecord<unknown>>(value: T) => T[keyof T][];
