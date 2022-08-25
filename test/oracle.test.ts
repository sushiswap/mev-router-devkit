import { expect } from 'chai';
import { ChainId } from '../src/constants';
import { TwapOracle } from '../src/oracle';
import { getProvider } from '../src/utils';

describe('TwapOracle', () => {
  // Arrange
  const provider = getProvider(ChainId.Goerli, {});

  describe('TwapOracle.getTokenDecimals', async () => {
    it('returns token0 and token1 decimals', async () => {
      // Arrange
      const oracleAddress = '0x1574a91BBc73037D6817B02a0e105DbF11791945';
      const expectedToken0Decimals = 6;
      const expectedToken1Decimals = 18;

      // Act
      const [token0Decimals, token1Decimals] = await TwapOracle.getTokensDecimals(
        provider,
        ChainId.Goerli,
        oracleAddress,
      );

      // Assert
      expect(token0Decimals).to.eq(expectedToken0Decimals);
      expect(token1Decimals).to.eq(expectedToken1Decimals);
    });
  });
});
