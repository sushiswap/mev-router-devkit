import { BigNumber } from 'ethers';
export function areTokensSorted(tokenA, tokenB) {
    return BigNumber.from(tokenA.address).lt(BigNumber.from(tokenB.address));
}
export function sortTokens(tokenA, tokenB) {
    return areTokensSorted(tokenA, tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
}
//# sourceMappingURL=sortTokens.js.map