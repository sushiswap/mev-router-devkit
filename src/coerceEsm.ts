/**
 * TODO: This util coerces CJS/ESM modules and will be removed once dependencies are ESM-only.
 *
 * @template {any} X
 * @param {X} x
 * @returns {X}
 */
// @ts-ignore
export const coerceEsm = (x) => (x && x.default ? x.default : x);
