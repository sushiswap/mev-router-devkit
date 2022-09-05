export class Cache {
    constructor(getFunction, setFunction, keyPrefix) {
        this.getFunction = getFunction;
        this.setFunction = setFunction;
        this.keyPrefix = keyPrefix;
    }
    get(key) {
        return this.getFunction(`${this.keyPrefix}${key}`);
    }
    set(key, value, ttlSeconds) {
        return this.setFunction(`${this.keyPrefix}${key}`, value, ttlSeconds);
    }
}
//# sourceMappingURL=Cache.js.map