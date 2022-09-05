import { Cache } from '../model';
export const getCache = (get, set, keyPrefix) => {
    return new Cache(get, set, keyPrefix);
};
//# sourceMappingURL=cache.js.map