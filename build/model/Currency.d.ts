import { ChainId } from '../constants';
export declare class Currency {
    readonly chainId: ChainId;
    readonly name: string;
    readonly symbol: string;
    readonly decimals: number;
    constructor(chainId: ChainId, name: string, symbol: string, decimals: number);
}
