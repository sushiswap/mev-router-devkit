import { commify, formatUnits, parseUnits } from '@ethersproject/units/lib.esm/index.js';
export function assert(value, message) {
    if (value === false || value === null || typeof value === 'undefined') {
        throw new Error(message || 'Assertion failed');
    }
}
export class DecimalBigNumber {
    constructor(value, decimals) {
        if (typeof value === 'string') {
            const _value = value.trim() === '' || isNaN(Number(value)) ? '0' : value;
            const _decimals = decimals === undefined ? this._inferDecimalAmount(value) : this._ensurePositive(decimals);
            const formatted = this._setDecimalAmount(_value, _decimals);
            this._value = parseUnits(formatted, _decimals);
            this._decimals = _decimals;
            return;
        }
        assert(decimals !== undefined, 'Decimal cannot be undefined');
        this._value = value;
        this._decimals = decimals;
    }
    _inferDecimalAmount(value) {
        const [, decimalStringOrUndefined] = value.split('.');
        return decimalStringOrUndefined?.length || 0;
    }
    _setDecimalAmount(value, decimals) {
        const [integer, _decimalsOrUndefined] = value.split('.');
        const _decimals = _decimalsOrUndefined || '';
        const paddingRequired = this._ensurePositive(decimals - _decimals.length);
        return integer + '.' + _decimals.substring(0, decimals) + '0'.repeat(paddingRequired);
    }
    _ensurePositive(decimals) {
        return Math.max(0, decimals);
    }
    toBigNumber(decimals) {
        return decimals === undefined
            ? this._value
            : new DecimalBigNumber(this.toString(), decimals)._value;
    }
    toString({ decimals, trim = true, format = false, } = {}) {
        let result = formatUnits(this._value, this._decimals);
        if (format)
            result = commify(result);
        const _decimals = decimals === undefined ? this._decimals : this._ensurePositive(decimals);
        result = this._setDecimalAmount(result, _decimals);
        if (trim)
            result = result.replace(/(?:\.|(\..*?))\.?0*$/, '$1');
        return result;
    }
    toApproxNumber() {
        return parseFloat(this.toString());
    }
    eq(value) {
        const valueAsDBN = value instanceof DecimalBigNumber ? value : new DecimalBigNumber(value);
        const largestDecimalAmount = Math.max(valueAsDBN._decimals, this._decimals);
        const normalisedThis = new DecimalBigNumber(this.toString(), largestDecimalAmount);
        const normalisedValue = new DecimalBigNumber(valueAsDBN.toString(), largestDecimalAmount);
        return normalisedThis._value.eq(normalisedValue._value);
    }
    sub(value) {
        const valueAsDBN = value instanceof DecimalBigNumber ? value : new DecimalBigNumber(value);
        const largestDecimalAmount = Math.max(valueAsDBN._decimals, this._decimals);
        const normalisedThis = new DecimalBigNumber(this.toString(), largestDecimalAmount);
        const normalisedValue = new DecimalBigNumber(valueAsDBN.toString(), largestDecimalAmount);
        return new DecimalBigNumber(normalisedThis._value.sub(normalisedValue._value), largestDecimalAmount);
    }
    add(value) {
        const valueAsDBN = value instanceof DecimalBigNumber ? value : new DecimalBigNumber(value);
        const largestDecimalAmount = Math.max(valueAsDBN._decimals, this._decimals);
        const normalisedThis = new DecimalBigNumber(this.toString(), largestDecimalAmount);
        const normalisedValue = new DecimalBigNumber(valueAsDBN.toString(), largestDecimalAmount);
        return new DecimalBigNumber(normalisedThis._value.add(normalisedValue._value), largestDecimalAmount);
    }
    gt(value) {
        const valueAsDBN = value instanceof DecimalBigNumber ? value : new DecimalBigNumber(value);
        const largestDecimalAmount = Math.max(valueAsDBN._decimals, this._decimals);
        const normalisedThis = new DecimalBigNumber(this.toString(), largestDecimalAmount);
        const normalisedValue = new DecimalBigNumber(valueAsDBN.toString(), largestDecimalAmount);
        return normalisedThis._value.gt(normalisedValue._value);
    }
    lt(value) {
        const valueAsDBN = value instanceof DecimalBigNumber ? value : new DecimalBigNumber(value);
        const largestDecimalAmount = Math.max(valueAsDBN._decimals, this._decimals);
        const normalisedThis = new DecimalBigNumber(this.toString(), largestDecimalAmount);
        const normalisedValue = new DecimalBigNumber(valueAsDBN.toString(), largestDecimalAmount);
        return normalisedThis._value.lt(normalisedValue._value);
    }
    mul(value) {
        const valueAsDBN = value instanceof DecimalBigNumber ? value : new DecimalBigNumber(value);
        const product = this._value.mul(valueAsDBN._value);
        return new DecimalBigNumber(product, this._decimals + valueAsDBN._decimals);
    }
    div(value, decimals) {
        const valueAsDBN = value instanceof DecimalBigNumber ? value : new DecimalBigNumber(value);
        const _decimals = decimals === undefined
            ? this._decimals + valueAsDBN._decimals
            : this._ensurePositive(decimals);
        const normalisedThis = new DecimalBigNumber(this.toString(), _decimals + valueAsDBN._decimals);
        const quotient = normalisedThis._value.div(valueAsDBN._value);
        return new DecimalBigNumber(quotient, _decimals);
    }
}
//# sourceMappingURL=DecimalBigNumber.js.map