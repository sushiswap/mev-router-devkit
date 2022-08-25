import { BigNumber } from 'ethers';

export interface PairState {
  reserve0: BigNumber;
  reserve1: BigNumber;
  price: BigNumber;
  mintFee: BigNumber;
  burnFee: BigNumber;
  swapFee: BigNumber;
  totalSupply: BigNumber;
}
