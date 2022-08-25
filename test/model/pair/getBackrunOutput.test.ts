import { expect } from 'chai';
import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';
import { TokenA, TokenB } from './fixtures';
import { CurrencyValue, Pair, PairState } from '../../../src/model';

describe('Pair.getBackrunOutput', () => {
  const state = {
    reserve0: parseUnits('10'),
    reserve1: parseUnits('20'),
    totalSupply: parseUnits('50'),
    burnFee: parseUnits('0.003'),
  } as PairState;

  const zeroLiquidityBalanceState = {
    ...state,
    totalSupply: BigNumber.from(0),
  } as PairState;

  it('return zeros for zero liquidity', () => {
    const pair = new Pair('0x0', TokenA, TokenB, state);
    const result = pair.getBurnOutput(BigNumber.from(0));
    expect(result.first).to.deep.eq(new CurrencyValue(TokenA, BigNumber.from(0)));
    expect(result.second).to.deep.eq(new CurrencyValue(TokenB, BigNumber.from(0)));
  });

  it('return zeros for zero liquidity balance', () => {
    const pair = new Pair('0x0', TokenA, TokenB, zeroLiquidityBalanceState);
    const result = pair.getBurnOutput(parseUnits('1'));
    expect(result.first).to.deep.eq(new CurrencyValue(TokenA, BigNumber.from(0)));
    expect(result.second).to.deep.eq(new CurrencyValue(TokenB, BigNumber.from(0)));
  });

  it('withdraw', () => {
    const pair = new Pair('0x0', TokenA, TokenB, state);
    const result = pair.getBurnOutput(parseUnits('1'));
    expect(result.first).to.deep.eq(new CurrencyValue(TokenA, parseUnits('0.1994')));
    expect(result.second).to.deep.eq(new CurrencyValue(TokenB, parseUnits('0.3988')));
  });

  it('withdraw whole liquidity', () => {
    const pair = new Pair('0x0', TokenA, TokenB, state);
    const result = pair.getBurnOutput(parseUnits('50'));
    expect(result.first).to.deep.eq(new CurrencyValue(TokenA, parseUnits('9.97')));
    expect(result.second).to.deep.eq(new CurrencyValue(TokenB, parseUnits('19.94')));
  });

  it('withdraw (inverted)', () => {
    const pair = new Pair('0x0', TokenB, TokenA, state);
    const result = pair.getBurnOutput(parseUnits('1'));
    expect(result.first).to.deep.eq(new CurrencyValue(TokenB, parseUnits('0.3988')));
    expect(result.second).to.deep.eq(new CurrencyValue(TokenA, parseUnits('0.1994')));
  });

  it('withdraw whole liquidity (inverted)', () => {
    const pair = new Pair('0x0', TokenB, TokenA, state);
    const result = pair.getBurnOutput(parseUnits('50'));
    expect(result.first).to.deep.eq(new CurrencyValue(TokenB, parseUnits('19.94')));
    expect(result.second).to.deep.eq(new CurrencyValue(TokenA, parseUnits('9.97')));
  });
});
