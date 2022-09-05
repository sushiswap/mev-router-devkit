import { Cache, GetCacheFunction, SetCacheFunction } from '../model';
export declare const getCache: (get: GetCacheFunction, set: SetCacheFunction, keyPrefix?: string) => Cache;
