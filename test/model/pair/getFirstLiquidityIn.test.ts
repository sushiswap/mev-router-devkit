import { expect } from 'chai';
import { parseUnits } from '@ethersproject/units';
import { Ether } from '../../../src/constants';
import { pairAB, TokenA, TokenB, pairBA, pairEthA, emptyPairAB } from './fixtures';
import { CurrencyValue } from '../../../src/model';

describe('Pair.getFirstLiquidityIn', () => {
  it('throws for invalid parameters', () => {
    expect(() => pairAB.getFirstLiquidityIn(new CurrencyValue(TokenA, parseUnits('1')))).to.throw(
      'Invalid parameter',
    );
  });

  it('returns correct value for Pair(A, B)', () => {
    expect(pairAB.getFirstLiquidityIn(new CurrencyValue(TokenB, parseUnits('2')))).to.deep.eq(
      new CurrencyValue(TokenA, parseUnits('1')),
    );
  });

  it('returns correct value for Pair(B, A)', () => {
    expect(pairBA.getFirstLiquidityIn(new CurrencyValue(TokenA, parseUnits('1')))).to.deep.eq(
      new CurrencyValue(TokenB, parseUnits('2')),
    );
  });

  it('returns correct value for Pair(Ether, A)', () => {
    expect(pairEthA.getFirstLiquidityIn(new CurrencyValue(TokenA, parseUnits('1')))).to.deep.eq(
      new CurrencyValue(Ether, parseUnits('2')),
    );
  });

  it('returns undefined for zero input', () => {
    expect(pairAB.getFirstLiquidityIn(new CurrencyValue(TokenB, parseUnits('0')))).to.deep.eq(
      undefined,
    );
  });

  it('returns undefined for empty reserves', () => {
    expect(emptyPairAB.getFirstLiquidityIn(new CurrencyValue(TokenB, parseUnits('2')))).to.deep.eq(
      undefined,
    );
  });
});
