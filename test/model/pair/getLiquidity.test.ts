import { expect } from 'chai';
import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits, formatUnits } from '@ethersproject/units';
import { state, TokenA, TokenB } from './fixtures';
import { CurrencyValue, Pair, PairState } from '../../../src/model';

describe('Pair.getLiquidity', () => {
  const testingState = {
    ...state,
    totalSupply: parseUnits('1'),
    price: parseUnits('1'),
    swapFee: BigNumber.from(0),
    mintFee: BigNumber.from(0),
  };
  const pair = new Pair('0x123', TokenA, TokenB, testingState);
  const pairInverted = new Pair('0x123', TokenB, TokenA, testingState);

  describe('getLiquidity proportionally', () => {
    describe('ordered', () => {
      const testCases = [
        {
          description: 'amounts proportional to reserves',
          amount0: '1',
          amount1: '2',
          expected: '1',
        },
        {
          description: 'amounts unproportional to reserves',
          amount0: '1',
          amount1: '3',
          expected: '1',
        },
        { description: 'zero first amount', amount0: '0', amount1: '3', expected: '0' },
        { description: 'zero second amount', amount0: '2', amount1: '0', expected: '0' },
      ];
      for (const testCase of testCases) {
        const { description, amount0, amount1, expected } = testCase;
        it(description, () => {
          const { liquidity } = pair.getLiquidity(
            new CurrencyValue(TokenA, parseUnits(amount0)),
            new CurrencyValue(TokenB, parseUnits(amount1)),
            false,
          );
          expect(liquidity).to.deep.eq(parseUnits(expected));
        });
      }
    });

    describe('inverted', () => {
      const testCases = [
        {
          description: 'amounts proportional to reserves',
          amount0: '2',
          amount1: '1',
          expected: '1',
        },
        {
          description: 'amounts unproportional to reserves',
          amount0: '3',
          amount1: '1',
          expected: '1',
        },
        { description: 'zero first amount', amount0: '3', amount1: '0', expected: '0' },
        { description: 'zero second amount', amount0: '0', amount1: '2', expected: '0' },
      ];
      for (const testCase of testCases) {
        const { description, amount0, amount1, expected } = testCase;
        it(description, () => {
          const { liquidity } = pairInverted.getLiquidity(
            new CurrencyValue(TokenB, parseUnits(amount0)),
            new CurrencyValue(TokenA, parseUnits(amount1)),
            false,
          );
          expect(liquidity).to.deep.eq(parseUnits(expected));
        });
      }
    });
  });

  describe('getLiquidity unproportionally', () => {
    const EPS = parseUnits('0.00001');
    describe('ordered', () => {
      const testCases = [
        {
          description: 'amounts proportional to reserves',
          amount0: '1',
          amount1: '2',
          expected: '1',
        },
        { description: 'zero first amount', amount0: '0', amount1: '3', expected: '0.5' },
        { description: 'zero second amount', amount0: '3', amount1: '0', expected: '0.5' },
        {
          description: 'amounts unproportional to reserves (first exceeds ratio)',
          amount0: '2',
          amount1: '2',
          expected: (9 / 7).toString(),
        },
        {
          description: 'amounts unproportional to reserves (second exceeds ratio)',
          amount0: '1',
          amount1: '3',
          expected: (9 / 7).toString(),
        },
      ];
      for (const testCase of testCases) {
        const { description, amount0, amount1, expected } = testCase;
        it(description, () => {
          const { liquidity } = pair.getLiquidity(
            new CurrencyValue(TokenA, parseUnits(amount0)),
            new CurrencyValue(TokenB, parseUnits(amount1)),
            true,
          );
          const expectedParsed = parseUnits(expected);
          expect(liquidity.gt(expectedParsed.sub(EPS))).to.be.true;
          expect(liquidity.lt(expectedParsed.add(EPS))).to.be.true;
        });
      }

      describe('random states', () => {
        const testCases = [
          {
            amount0: '7.43',
            amount1: '20.21',
            expected: '3.718741061607069763',
            state: {
              reserve0: parseUnits('200'),
              reserve1: parseUnits('300'),
              price: parseUnits('1.675'),
              totalSupply: parseUnits('72.68'),
              swapFee: parseUnits('0.001'),
              mintFee: parseUnits('0.001'),
            } as PairState,
          },
          {
            amount0: '37.24',
            amount1: '17.333',
            expected: '4.689984885810454199',
            state: {
              reserve0: parseUnits('1500'),
              reserve1: parseUnits('7000'),
              price: parseUnits('101.2308'),
              totalSupply: parseUnits('201.203'),
              swapFee: parseUnits('0.003'),
              mintFee: parseUnits('0.001'),
            } as PairState,
          },
          {
            amount0: '50',
            amount1: '60',
            expected: '500.331682938101527153',
            state: {
              reserve0: parseUnits('1000'),
              reserve1: parseUnits('1000'),
              price: parseUnits('23.23'),
              totalSupply: parseUnits('10000'),
              swapFee: parseUnits('0.31'),
              mintFee: parseUnits('0.005'),
            } as PairState,
          },
        ];
        for (const testCase of testCases) {
          const { amount0, amount1, expected, state } = testCase;
          const pair = new Pair('0x123', TokenA, TokenB, state);
          const description = `
              reserves = ${formatUnits(state.reserve0)}/${formatUnits(state.reserve1)},
              amounts = ${formatUnits(parseUnits(amount0))}/${formatUnits(parseUnits(amount1))},
              price = ${formatUnits(state.price)},
              totalSupply = ${formatUnits(state.totalSupply)}
              swapFee = ${formatUnits(state.swapFee)}
              mintFee = ${formatUnits(state.mintFee)}
            `;
          it(description, () => {
            const { liquidity } = pair.getLiquidity(
              new CurrencyValue(TokenA, parseUnits(amount0)),
              new CurrencyValue(TokenB, parseUnits(amount1)),
              true,
            );
            const expectedParsed = parseUnits(expected);
            expect(liquidity.gt(expectedParsed.sub(EPS))).to.be.true;
            expect(liquidity.lt(expectedParsed.add(EPS))).to.be.true;
          });
        }
      });
    });
    describe('inverted', () => {
      const testCases = [
        {
          description: 'amounts proportional to reserves',
          amount0: '2',
          amount1: '1',
          expected: '1',
        },
        { description: 'zero first amount', amount0: '3', amount1: '0', expected: '0.5' },
        { description: 'zero second amount', amount0: '0', amount1: '3', expected: '0.5' },
        {
          description: 'amounts unproportional to reserves (first exceeds ratio)',
          amount0: '2',
          amount1: '2',
          expected: (9 / 7).toString(),
        },
        {
          description: 'amounts unproportional to reserves (second exceeds ratio)',
          amount0: '3',
          amount1: '1',
          expected: (9 / 7).toString(),
        },
      ];
      for (const testCase of testCases) {
        const { description, amount0, amount1, expected } = testCase;
        it(description, () => {
          const { liquidity } = pairInverted.getLiquidity(
            new CurrencyValue(TokenB, parseUnits(amount0)),
            new CurrencyValue(TokenA, parseUnits(amount1)),
            true,
          );
          const expectedParsed = parseUnits(expected);
          expect(liquidity.gt(expectedParsed.sub(EPS))).to.be.true;
          expect(liquidity.lt(expectedParsed.add(EPS))).to.be.true;
        });
      }
    });
  });
});
