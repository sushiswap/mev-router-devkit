/// <reference types="node" />
import { URL } from 'url';
export declare function loadEsmModule<T>(modulePath: string | URL): Promise<T>;
