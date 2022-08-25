import { expect } from 'chai';
import { getProvider } from '../src/utils';
import {
  ChainId,
  GoerliEther,
  GoerliLink,
  GoerliUSDCoin,
  GoerliWrappedBitcoin,
  WETH_USDC,
} from '../src/constants';
import { TwapFactory } from '../src/factory';

describe('TwapFactory', () => {
  // Arrange
  const provider = getProvider(ChainId.Goerli, {});

  describe('TwapFactory.getPairAddress', () => {
    it('returns WETH-USDC pair address', async () => {
      // Act
      const pairAddress = await TwapFactory.getPairAddress(
        provider,
        ChainId.Goerli,
        GoerliUSDCoin,
        GoerliEther,
      );

      // Assert
      expect(pairAddress).to.eq(WETH_USDC[ChainId.Goerli].toLowerCase());
    });

    it('returns undefined for not existing LINK-WBTC pair', async () => {
      // Act
      const pairAddress = await TwapFactory.getPairAddress(
        provider,
        ChainId.Goerli,
        GoerliLink,
        GoerliWrappedBitcoin,
      );

      // Assert
      expect(pairAddress).to.eq(undefined);
    });
  });

  describe('TwapFactory.getPairsLength', () => {
    it('returns pairs length', async () => {
      // Act
      const pairsLength = await TwapFactory.getPairCount(provider, ChainId.Goerli);

      // Assert
      expect(typeof pairsLength).to.eq('number');
    });
  });

  describe('TwapFactory.getPairAddressById', () => {
    it('returns pair address', async () => {
      // Act
      const pairAddress = await TwapFactory.getPairAddressById(provider, ChainId.Goerli, 1);
      const expectedPairAddress = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000';

      // Assert
      expect(pairAddress).to.eq(expectedPairAddress.toLowerCase());
    });
  });
});
