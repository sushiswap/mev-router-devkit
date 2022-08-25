import { expect } from 'chai';
import { getProvider } from '../src/utils';
import {
  ChainId,
  GoerliEther,
  GoerliLink,
  GoerliUSDCoin,
  GoerliWrappedBitcoin,
  USDC,
  WETH,
  WETH_USDC,
} from '../src/constants';
import { TwapReader } from '../src/reader';

describe('TwapReader', () => {
  describe('TwapReader.getPair', () => {
    // Arrange
    const provider = getProvider(ChainId.Goerli, {});

    it('returns WETH-USDC pair', async () => {
      // Act
      const pair = await TwapReader.getPair(provider, ChainId.Goerli, GoerliUSDCoin, GoerliEther);

      // Assert
      expect(pair?.address).to.eq(WETH_USDC[ChainId.Goerli].toLowerCase());
      expect(pair?.getToken0Address().toLowerCase()).to.eq(USDC[ChainId.Goerli].toLowerCase());
      expect(pair?.getToken1Address().toLowerCase()).to.eq(WETH[ChainId.Goerli].toLowerCase());
    });

    it('returns undefined for not existing LINK-WBTC pair', async () => {
      // Act
      const pair = await TwapReader.getPair(
        provider,
        ChainId.Goerli,
        GoerliLink,
        GoerliWrappedBitcoin,
      );

      // Assert
      expect(pair).to.eq(undefined);
    });
  });
});
