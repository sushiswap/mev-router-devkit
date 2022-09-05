import { BaseProvider } from '@ethersproject/providers/lib.esm/index.js';
import { ChainId } from '../constants';
export declare const multicall: (provider: BaseProvider, chainId: ChainId, calls: {
    target: string;
    callData: any;
}[]) => Promise<any>;
export declare const multicallFunctionCall: () => {
    encode: (method: string, callData: any) => {
        target: string;
        callData: string;
    };
    decode: (method: string, returnData: any) => import("@ethersproject/abi/lib.esm/index.js").Result;
};
