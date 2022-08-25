import { Cache, GetCacheFunction, SetCacheFunction } from '../model';

export const getCache = (get: GetCacheFunction, set: SetCacheFunction, keyPrefix?: string) => {
  return new Cache(get, set, keyPrefix);
};
