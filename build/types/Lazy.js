const NOT_COMPUTED = Symbol('NOT_COMPUTED');
export const Lazy = (func) => {
    const value = { contents: NOT_COMPUTED };
    return {
        get() {
            if (value.contents === NOT_COMPUTED) {
                value.contents = func();
            }
            return value.contents;
        },
    };
};
//# sourceMappingURL=Lazy.js.map