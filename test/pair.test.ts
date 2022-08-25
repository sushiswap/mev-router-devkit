import { expect } from 'chai';
import { ChainId, USDC } from '../src/constants';
import { Token } from '../src/model';
import { TwapPair } from '../src/pair';
import { getProvider } from '../src/utils';

describe('TwapPair', () => {
  // Arrange
  const provider = getProvider(ChainId.Goerli, {});

  describe('TwapPair.getToken', () => {
    it('returns tokens', async () => {
      // Arrange
      const tokenAddress = USDC[ChainId.Goerli];
      const expectedToken = new Token(
        ChainId.Goerli,
        USDC[ChainId.Goerli].toLowerCase(),
        'USD Coin',
        'USDC',
        6,
      );

      // Act
      const token = await TwapPair.getToken(provider, ChainId.Goerli, tokenAddress);

      // Assert
      expect(token).to.eql(expectedToken);
    });
  });

  describe('TwapPair.getTokenDecimals', () => {
    it('returns token0 and token1 decimals', async () => {
      // Arrange
      const tokenAddress = USDC[ChainId.Goerli];
      const expectedTokenDecimals = 6;

      // Act
      const tokenDecimals = await (<any>TwapPair).getTokenDecimals(
        provider,
        ChainId.Goerli,
        tokenAddress,
      );

      // Assert
      expect(tokenDecimals).to.eq(expectedTokenDecimals);
    });
  });

  describe('TwapPair.getTokenAddresses', () => {
    it('returns token0 and token1 addresses', async () => {
      // Arrange
      const pairAddress = '0x1b1a7E186cf13Db3852f7f5bf19091061f323842';
      const expectedToken0Address = '0xb922e0b5C8fFA89Fe6195a581acC7D292B924142';
      const expectedToken1Address = '0xd0A1E359811322d97991E03f863a0C30C2cF029C';

      // Act
      const [token0Address, token1Address] = await TwapPair.getTokenAddresses(
        provider,
        ChainId.Goerli,
        pairAddress,
      );

      // Assert
      expect(token0Address).to.eq(expectedToken0Address.toLowerCase());
      expect(token1Address).to.eq(expectedToken1Address.toLowerCase());
    });
  });

  describe('TwapPair.getOracleAddresses', () => {
    it('returns oracle address for given pair address', async () => {
      // Arrange
      const pairAddress = '0x1b1a7E186cf13Db3852f7f5bf19091061f323842';
      const expectedOracleAddress = '0x1574a91BBc73037D6817B02a0e105DbF11791945';
      // Act
      const oracleAddress = await TwapPair.getOracleAddress(provider, ChainId.Goerli, pairAddress);

      // Assert
      expect(oracleAddress).to.eq(expectedOracleAddress.toLowerCase());
    });
  });
});
