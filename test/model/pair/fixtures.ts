import { parseUnits } from '@ethersproject/units';
import { ChainId, Ether } from '../../../src/constants';
import { Pair, PairState, Token } from '../../../src/model';

export const TokenA = new Token(ChainId.Mainnet, `0x${'0'.repeat(40)}`, 'Aye', 'AAA', 18);
export const TokenB = new Token(ChainId.Mainnet, `0x${'F'.repeat(40)}`, 'Bee', 'BBB', 18);
export const EightDecimalToken = new Token(
  ChainId.Mainnet,
  `0x${'0'.repeat(39)}1`,
  '8 Decimal Token',
  'EGH',
  8,
);

export const state = {
  reserve0: parseUnits('1'),
  reserve1: parseUnits('2'),
} as PairState;
export const pairAB = new Pair('0x0', TokenA, TokenB, state);
export const pairBA = new Pair('0x0', TokenB, TokenA, state);
export const pairEthA = new Pair('0x0', Ether, TokenA, state);
export const pairAEth = new Pair('0x0', TokenA, Ether, state);
export const emptyPairAB = new Pair('0x0', TokenA, TokenB, {
  reserve0: parseUnits('0'),
  reserve1: parseUnits('0'),
} as PairState);
