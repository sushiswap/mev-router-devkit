import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Ether } from '../../../src/constants';
import { CurrencyValue, Pair } from '../../../src/model';
import { TokenA } from './fixtures';

// Backrun Estimation
describe('Pair.getEstimatedFeeBackrun', () => {
  const state = {
    swapFee: parseUnits('0.003'),
    mintFee: parseUnits('0.003'),
    burnFee: parseUnits('0.003'),
    price: parseUnits('379.55'),
    reserve0: parseUnits('100'),
    reserve1: parseUnits('2137'),
    totalSupply: parseUnits('0'),
  };

  it('returns estimated fee', () => {
    const pair = new Pair('0x123', TokenA, Ether, state);
    const result = pair.getEstimatedSwapFee(new CurrencyValue(Ether, parseUnits('100')).value);
    expect(result).to.deep.equal(BigNumber.from('300000000000000000'));
  });
});
