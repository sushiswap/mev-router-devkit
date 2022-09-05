export declare type GetCacheFunction = (key: string) => Promise<string | undefined>;
export declare type SetCacheFunction = (key: string, value: string, ttlSeconds?: number) => Promise<void>;
export declare class Cache {
    protected getFunction: GetCacheFunction;
    protected setFunction: SetCacheFunction;
    protected keyPrefix?: string;
    constructor(getFunction: GetCacheFunction, setFunction: SetCacheFunction, keyPrefix?: string);
    get(key: string): Promise<string | undefined>;
    set(key: string, value: string, ttlSeconds?: number): Promise<void>;
}
