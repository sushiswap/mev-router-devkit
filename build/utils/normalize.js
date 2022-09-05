import { BigNumber } from 'ethers';
export function normalizeTo18Decimals(amount, decimals) {
    if (decimals === 18) {
        return amount;
    }
    else if (decimals > 18) {
        return amount.div(BigNumber.from(10).pow(decimals - 18));
    }
    else {
        return amount.mul(BigNumber.from(10).pow(18 - decimals));
    }
}
export function denormalizeFrom18Decimals(amount, decimals) {
    if (decimals === 18) {
        return amount;
    }
    else if (decimals > 18) {
        return amount.mul(BigNumber.from(10).pow(decimals - 18));
    }
    else {
        return amount.div(BigNumber.from(10).pow(18 - decimals));
    }
}
//# sourceMappingURL=normalize.js.map