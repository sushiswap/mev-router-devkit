import { expect } from 'chai';
import { parseUnits } from '@ethersproject/units';
import { Ether } from '../../../src/constants';
import { CurrencyValue } from '../../../src/model';
import { emptyPairAB, pairAB, pairAEth, pairBA, TokenA, TokenB } from './fixtures';

describe('Pair.getSecondLiquidityIn', () => {
  it('throws for invalid parameters', () => {
    expect(() => pairAB.getSecondLiquidityIn(new CurrencyValue(TokenB, parseUnits('1')))).to.throw(
      'Invalid parameter',
    );
  });

  it('returns correct value for Pair(A, B)', () => {
    expect(pairAB.getSecondLiquidityIn(new CurrencyValue(TokenA, parseUnits('1')))).to.deep.eq(
      new CurrencyValue(TokenB, parseUnits('2')),
    );
  });

  it('returns correct value for Pair(B, A)', () => {
    expect(pairBA.getSecondLiquidityIn(new CurrencyValue(TokenB, parseUnits('2')))).to.deep.eq(
      new CurrencyValue(TokenA, parseUnits('1')),
    );
  });

  it('returns correct value for Pair(A, Ether)', () => {
    expect(pairAEth.getSecondLiquidityIn(new CurrencyValue(TokenA, parseUnits('1')))).to.deep.eq(
      new CurrencyValue(Ether, parseUnits('2')),
    );
  });

  it('returns undefined for zero input', () => {
    expect(pairAB.getSecondLiquidityIn(new CurrencyValue(TokenA, parseUnits('0')))).to.deep.eq(
      undefined,
    );
  });

  it('returns undefined for empty reserves', () => {
    expect(emptyPairAB.getSecondLiquidityIn(new CurrencyValue(TokenA, parseUnits('1')))).to.deep.eq(
      undefined,
    );
  });
});
