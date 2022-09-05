export declare type LooseRecord<T> = Record<string | number | symbol, T>;
export declare type Remap<T> = {
    [K in keyof T]: T[K];
};
