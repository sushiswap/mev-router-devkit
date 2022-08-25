import { expect } from 'chai';
import { Ether } from '../../../src/constants';
import { CurrencyValue } from '../../../src/model';
import { pairAB, TokenA, state, pairBA, TokenB, pairEthA } from './fixtures';

describe('Pair.getFirstReserve', () => {
  it('returns correct value for Pair(A, B)', () => {
    expect(pairAB.getFirstReserve()).to.deep.eq(new CurrencyValue(TokenA, state.reserve0));
  });

  it('returns correct value for Pair(B, A)', () => {
    expect(pairBA.getFirstReserve()).to.deep.eq(new CurrencyValue(TokenB, state.reserve1));
  });

  it('returns correct value for Pair(Ether, A)', () => {
    expect(pairEthA.getFirstReserve()).to.deep.eq(new CurrencyValue(Ether, state.reserve1));
  });
});
