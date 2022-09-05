export class NodeJSCache {
    constructor(nodeCache) {
        this.nodeCache = nodeCache;
    }
    async get(key) {
        return this.nodeCache.get(key);
    }
    async set(key, value) {
        return this.nodeCache.set(key, value);
    }
    async has(key) {
        return this.nodeCache.has(key);
    }
}
//# sourceMappingURL=cache-node.js.map