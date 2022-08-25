import { expect } from 'chai';
import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';
import { Ether } from '../../../src/constants';
import { TokenA, EightDecimalToken, TokenB } from './fixtures';
import { CurrencyValue, Pair } from '../../../src/model';

describe('Pair.getSwapOutput', () => {
  const state = {
    swapFee: parseUnits('0.003'),
    mintFee: parseUnits('0.003'),
    burnFee: parseUnits('0.003'),
    price: parseUnits('379.55'),
    reserve0: parseUnits('100'),
    reserve1: parseUnits('2137'),
    totalSupply: parseUnits('0'),
  };

  describe('Ether -> TokenA', () => {
    it('swap', () => {
      const pair = new Pair('0x123', TokenA, Ether, state);
      const result = pair.getSwapOutput(new CurrencyValue(Ether, parseUnits('100')));
      expect(result).to.deep.equal(new CurrencyValue(TokenA, parseUnits('0.262679488868396786')));
    });

    it('swap (inverted)', () => {
      const pair = new Pair('0x123', Ether, TokenA, state);
      const result = pair.getSwapOutput(new CurrencyValue(Ether, parseUnits('100')));
      expect(result).to.deep.equal(new CurrencyValue(TokenA, parseUnits('0.262679488868396786')));
    });
  });

  describe('TokenA -> Ether', () => {
    it('swap', () => {
      const pair = new Pair('0x123', TokenA, Ether, state);
      const result = pair.getSwapOutput(new CurrencyValue(TokenA, parseUnits('1')));
      expect(result).to.deep.equal(new CurrencyValue(Ether, parseUnits('378.41135')));
    });

    it('swap (inverted)', () => {
      const pair = new Pair('0x123', Ether, TokenA, state);
      const result = pair.getSwapOutput(new CurrencyValue(TokenA, parseUnits('1')));
      expect(result).to.deep.equal(new CurrencyValue(Ether, parseUnits('378.41135')));
    });
  });

  describe('Ether -> 8DecimalToken', () => {
    const testingState = {
      ...state,
      reserve0: parseUnits('10000', 8),
      reserve1: parseUnits('2000'),
      price: parseUnits('17.25'),
      swapFee: BigNumber.from(0),
    };
    const pair = new Pair('0x123', EightDecimalToken, Ether, testingState);
    const invertedPair = new Pair('0x123', Ether, EightDecimalToken, testingState);

    for (let i = 0; i < 4; i++) {
      const etherValue = `0.${'0'.repeat(i)}1`;
      const expectedValue = `${(0.05797102 * 10 ** -(i + 1)).toFixed(8)}`;
      it(`swaps ${etherValue} ETH`, () => {
        const result = pair.getSwapOutput(new CurrencyValue(Ether, parseUnits(etherValue)));
        const expected = new CurrencyValue(EightDecimalToken, parseUnits(expectedValue, 8));
        expect(result?.currency).to.deep.equal(expected.currency);
        expect(result?.value.gt(expected.value.mul(9).div(10))).to.be.true;
        expect(result?.value.lt(expected.value.mul(11).div(10))).to.be.true;
      });
    }

    for (let i = 0; i < 4; i++) {
      const etherValue = `1${'0'.repeat(i)}`;
      const expectedValue = `${(0.05797102 * 10 ** i).toFixed(8)}`;
      it(`swaps ${etherValue} ETH`, () => {
        const result = pair.getSwapOutput(new CurrencyValue(Ether, parseUnits(etherValue)));
        const expected = new CurrencyValue(EightDecimalToken, parseUnits(expectedValue, 8));
        expect(result?.currency).to.deep.equal(expected.currency);
        expect(result?.value.gt(expected.value.mul(9).div(10))).to.be.true;
        expect(result?.value.lt(expected.value.mul(11).div(10))).to.be.true;
      });
    }

    for (let i = 0; i < 4; i++) {
      const etherValue = `0.${'0'.repeat(i)}1`;
      const expectedValue = `${(0.05797102 * 10 ** -(i + 1)).toFixed(8)}`;
      it(`swaps ${etherValue} ETH (inverted)`, () => {
        const result = invertedPair.getSwapOutput(new CurrencyValue(Ether, parseUnits(etherValue)));
        const expected = new CurrencyValue(EightDecimalToken, parseUnits(expectedValue, 8));
        expect(result?.currency).to.deep.equal(expected.currency);
        expect(result?.value.gt(expected.value.mul(9).div(10))).to.be.true;
        expect(result?.value.lt(expected.value.mul(11).div(10))).to.be.true;
      });
    }

    for (let i = 0; i < 4; i++) {
      const etherValue = `1${'0'.repeat(i)}`;
      const expectedValue = `${(0.05797102 * 10 ** i).toFixed(8)}`;
      it(`swaps ${etherValue} ETH (inverted)`, () => {
        const result = invertedPair.getSwapOutput(new CurrencyValue(Ether, parseUnits(etherValue)));
        const expected = new CurrencyValue(EightDecimalToken, parseUnits(expectedValue, 8));
        expect(result?.currency).to.deep.equal(expected.currency);
        expect(result?.value.gt(expected.value.mul(9).div(10))).to.be.true;
        expect(result?.value.lt(expected.value.mul(11).div(10))).to.be.true;
      });
    }
  });

  it('return undefined for zero', () => {
    const pair = new Pair('0x0', TokenA, TokenB, state);
    expect(pair.getSwapOutput(new CurrencyValue(TokenA, BigNumber.from(0)))).to.eq(undefined);
    expect(pair.getSwapOutput(new CurrencyValue(TokenB, BigNumber.from(0)))).to.eq(undefined);
  });
});
