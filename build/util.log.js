class NullLogger {
    constructor() {
        this.ERROR_MESSAGE = 'NullLogger does not support. Instantiate a valid logger using "setGlobalLogger"';
        this.src = true;
    }
    addStream(_stream) {
        throw new Error(this.ERROR_MESSAGE);
    }
    addSerializers(_serializers) {
        throw new Error(this.ERROR_MESSAGE);
    }
    child(_options, _simple) {
        return this;
    }
    reopenFileStreams() {
        throw new Error(this.ERROR_MESSAGE);
    }
    level(_value) {
        return;
    }
    levels(_name, _value) {
        return;
    }
    trace(..._rest) {
        return true;
    }
    debug(..._rest) {
        return true;
    }
    info(..._rest) {
        return true;
    }
    warn(..._rest) {
        return true;
    }
    error(..._rest) {
        return true;
    }
    fatal(..._rest) {
        return true;
    }
    addListener(_event, _listener) {
        throw new Error(this.ERROR_MESSAGE);
    }
    on(_event, _listener) {
        throw new Error(this.ERROR_MESSAGE);
    }
    once(_event, _listener) {
        throw new Error(this.ERROR_MESSAGE);
    }
    removeListener(_event, _listener) {
        throw new Error(this.ERROR_MESSAGE);
    }
    off(_event, _listener) {
        throw new Error(this.ERROR_MESSAGE);
    }
    removeAllListeners(_event) {
        throw new Error(this.ERROR_MESSAGE);
    }
    setMaxListeners(_n) {
        throw new Error(this.ERROR_MESSAGE);
    }
    getMaxListeners() {
        throw new Error(this.ERROR_MESSAGE);
    }
    listeners(_event) {
        throw new Error(this.ERROR_MESSAGE);
    }
    rawListeners(_event) {
        throw new Error(this.ERROR_MESSAGE);
    }
    emit(_event, ..._args) {
        throw new Error(this.ERROR_MESSAGE);
    }
    listenerCount(_event) {
        throw new Error(this.ERROR_MESSAGE);
    }
    prependListener(_event, _listener) {
        throw new Error(this.ERROR_MESSAGE);
    }
    prependOnceListener(_event, _listener) {
        throw new Error(this.ERROR_MESSAGE);
    }
    eventNames() {
        throw new Error(this.ERROR_MESSAGE);
    }
}
export let log = new NullLogger();
export const setGlobalLogger = (_log) => {
    log = _log;
};
//# sourceMappingURL=util.log.js.map