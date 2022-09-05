export class ErrorHandler {
    constructor() {
        this.noticeError = (error) => {
            if (error instanceof Error) {
                console.error(error);
            }
            else if (typeof error === 'string') {
                console.error(error);
            }
            else {
                console.error(error);
            }
        };
        this.asyncWrapper = (asyncFunction) => {
            return (...args) => asyncFunction(...args).catch(this.noticeError);
        };
    }
}
export class JsonRpcError extends Error {
    constructor(code, message, data) {
        super(message);
        this.code = code;
        this.data = data;
        this.name = this.constructor.name;
    }
}
//# sourceMappingURL=ErrHandler.js.map