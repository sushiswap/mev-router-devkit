import { expect } from 'chai';
import { Ether } from '../../../src/constants';
import { CurrencyValue } from '../../../src/model';
import { pairAB, pairAEth, pairBA, state, TokenA, TokenB } from './fixtures';

describe('Pair.backrun.getSecondReserve', () => {
  it('returns correct value for Pair(A, B)', () => {
    expect(pairAB.getSecondReserve()).to.deep.eq(new CurrencyValue(TokenB, state.reserve1));
  });

  it('returns correct value for Pair(B, A)', () => {
    expect(pairBA.getSecondReserve()).to.deep.eq(new CurrencyValue(TokenA, state.reserve0));
  });

  it('returns correct value for Pair(A, Ether)', () => {
    expect(pairAEth.getSecondReserve()).to.deep.eq(new CurrencyValue(Ether, state.reserve1));
  });
});
