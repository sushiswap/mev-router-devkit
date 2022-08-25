import { expect } from 'chai';
import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';
import { Ether } from '../../../src/constants';
import { TokenA, TokenB } from './fixtures';
import { CurrencyValue, Pair } from '../../../src/model';

describe('Pair.getSwapInput', () => {
  const state = {
    swapFee: parseUnits('0.003'),
    mintFee: parseUnits('0.003'),
    burnFee: parseUnits('0.003'),
    price: parseUnits('379.55'),
    reserve0: parseUnits('100'),
    reserve1: parseUnits('2137'),
    totalSupply: parseUnits('0'),
  };

  describe('TokenA -> Ether', () => {
    it('swap', () => {
      const pair = new Pair('0x0', TokenA, Ether, state);
      const result = pair.getSwapInput(new CurrencyValue(Ether, parseUnits('100')));
      expect(result).to.deep.eq(new CurrencyValue(TokenA, parseUnits('0.264262686623960935')));
    });

    it('swap (inverted)', () => {
      const pair = new Pair('0x0', Ether, TokenA, state);
      const result = pair.getSwapInput(new CurrencyValue(Ether, parseUnits('100')));
      expect(result).to.deep.eq(new CurrencyValue(TokenA, parseUnits('0.264262686623960935')));
    });
  });

  describe('Ether -> TokenA', () => {
    it('swap', () => {
      const pair = new Pair('0x0', TokenA, Ether, state);
      const result = pair.getSwapInput(new CurrencyValue(TokenA, parseUnits('1')));
      expect(result).to.deep.eq(new CurrencyValue(Ether, parseUnits('380.692076228686058176')));
    });

    it('swap (inverted)', () => {
      const pair = new Pair('0x0', Ether, TokenA, state);
      const result = pair.getSwapInput(new CurrencyValue(TokenA, parseUnits('1')));
      expect(result).to.deep.eq(new CurrencyValue(Ether, parseUnits('380.692076228686058176')));
    });
  });

  it('return undefined for zero', () => {
    const pair = new Pair('0x0', TokenA, TokenB, state);
    expect(pair.getSwapInput(new CurrencyValue(TokenA, BigNumber.from(0)))).to.eq(undefined);
    expect(pair.getSwapInput(new CurrencyValue(TokenB, BigNumber.from(0)))).to.eq(undefined);
  });
});
