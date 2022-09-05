import NodeCache from 'node-cache';
import { ICache } from './cache';
export declare class NodeJSCache<T> implements ICache<T> {
    private nodeCache;
    constructor(nodeCache: NodeCache);
    get(key: string): Promise<T | undefined>;
    set(key: string, value: T): Promise<boolean>;
    has(key: string): Promise<boolean>;
}
