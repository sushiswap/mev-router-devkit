import { BigNumber } from 'ethers';
import { BN_10_18 } from '../constants';

export function f18Mul(a: BigNumber, b: BigNumber) {
  return a.mul(b).div(BN_10_18);
}
