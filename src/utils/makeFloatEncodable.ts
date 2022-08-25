import { BigNumber } from 'ethers';

export function makeFloatEncodable(n: BigNumber) {
  const hex = n.toHexString();
  if (hex.length <= 8) {
    return n;
  } else {
    const cutPrecision = hex.substring(0, 8).concat('0'.repeat(hex.length - 8));
    return BigNumber.from(cutPrecision);
  }
}
