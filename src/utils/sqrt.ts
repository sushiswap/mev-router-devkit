import { BigNumber } from 'ethers';

export function sqrt(y: BigNumber): BigNumber {
  let z = y;
  if (y.gt(3)) {
    let x = y.div(2).add(1);
    while (x.lt(z)) {
      z = x;
      x = y.div(x).add(x).div(2);
    }
  } else if (!y.eq(0)) {
    z = BigNumber.from(1);
  }
  return z;
}
