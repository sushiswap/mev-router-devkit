import { expect } from 'chai';
import { parseUnits } from '@ethersproject/units';
import { Pair, TokenPrice } from '../../../src/model';
import { pairAB, TokenA, EightDecimalToken, state } from './fixtures';
import { BN_10_18 } from '../../../src/constants';

describe('Pair.getDepositReservesFraction', () => {
  const basicTokenPrice: TokenPrice = {
    symbol: '',
    address: '',
    price: BN_10_18,
  };
  it('returns undefined for no tokenPrice', () => {
    expect(pairAB.getDepositReservesFraction()).to.eq(undefined);
    expect(pairAB.getDepositReservesFraction(basicTokenPrice)).to.eq(undefined);
    expect(pairAB.getDepositReservesFraction(undefined, basicTokenPrice)).to.eq(undefined);
  });

  it('limits to upperLimit', () => {
    const firstTokenPrice = {
      ...basicTokenPrice,
      price: parseUnits('1', 20),
    };
    expect(pairAB.getDepositReservesFraction(firstTokenPrice, basicTokenPrice)).to.deep.eq(
      parseUnits('0.99', 20),
    );
  });

  it('limits to lowerLimit', () => {
    const firstTokenPrice = {
      ...basicTokenPrice,
      price: parseUnits('1', 16),
    };
    expect(pairAB.getDepositReservesFraction(firstTokenPrice, basicTokenPrice)).to.deep.eq(
      parseUnits('1', 16),
    );
  });

  it('returns correct fraction for same decimals', () => {
    const firstTokenPrice = {
      ...basicTokenPrice,
      price: parseUnits('1.2750', 18),
    };
    const secondTokenPrice = {
      ...basicTokenPrice,
      price: parseUnits('0.7843', 18),
    };
    expect(pairAB.getDepositReservesFraction(firstTokenPrice, secondTokenPrice)).to.deep.eq(
      parseUnits('0.625653448935356368'),
    );
  });

  it('returns correct fraction for different decimals', () => {
    const pair = new Pair('0x0', TokenA, EightDecimalToken, state);
    const firstTokenPrice = {
      ...basicTokenPrice,
      price: parseUnits('1.2750', 18),
    };
    const secondTokenPrice = {
      ...basicTokenPrice,
      price: parseUnits('0.7843', 8),
    };
    expect(pair.getDepositReservesFraction(firstTokenPrice, secondTokenPrice)).to.deep.eq(
      parseUnits('0.625653448935356368'),
    );
  });
});
