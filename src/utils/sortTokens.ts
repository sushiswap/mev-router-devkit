import { BigNumber } from 'ethers';
import { Token } from '../model';

export function areTokensSorted(tokenA: Token, tokenB: Token) {
  return BigNumber.from(tokenA.address).lt(BigNumber.from(tokenB.address));
}

export function sortTokens(tokenA: Token, tokenB: Token) {
  return areTokensSorted(tokenA, tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
}
