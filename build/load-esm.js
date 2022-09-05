export function loadEsmModule(modulePath) {
    return new Function('modulePath', `return import(modulePath);`)(modulePath);
}
//# sourceMappingURL=load-esm.js.map