import { BigNumber } from 'ethers';
const NUMBER_REGEX = /^\d*(\.\d*)?$/;
export function bigNumberFromString(decimals, value) {
    if (!NUMBER_REGEX.test(value)) {
        throw new Error('Invalid value provided');
    }
    let [integer = '', decimal = ''] = value.split('.');
    if (integer === '') {
        integer = '0';
    }
    if (decimal.length < decimals) {
        decimal = decimal.padEnd(decimals, '0');
    }
    else if (decimal.length > decimals) {
        decimal = decimal.substring(0, decimals);
    }
    return BigNumber.from(integer.concat(decimal));
}
//# sourceMappingURL=bn.js.map