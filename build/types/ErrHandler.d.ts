export declare class ErrorHandler {
    readonly noticeError: (error: any) => void;
    readonly asyncWrapper: <R, P extends any[]>(asyncFunction: (...args: P) => Promise<R>) => (...args: P) => void;
}
export declare class JsonRpcError extends Error {
    readonly code: number;
    readonly data?: object | undefined;
    constructor(code: number, message: string, data?: object | undefined);
}
