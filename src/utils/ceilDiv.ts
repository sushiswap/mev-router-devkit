import { BigNumber } from 'ethers';

export function ceilDiv(a: BigNumber, b: BigNumber) {
  const c = a.div(b);
  if (c.eq(a.mul(b))) {
    return c;
  } else {
    return c.add(1);
  }
}
