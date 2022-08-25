import { expect } from 'chai';
import { emptyPairAB, pairAB } from './fixtures';

describe('Pair.isEmpty', () => {
  it('returns true for empty pairs', () => {
    expect(emptyPairAB.isEmpty()).to.eq(true);
  });

  it('returns false for not empty pairs', () => {
    expect(pairAB.isEmpty()).to.eq(false);
  });
});
