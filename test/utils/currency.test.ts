import { expect } from 'chai';
import { ChainId, CVX, WETH } from '../../src/constants';
import { Token } from '../../src/model';
import { getToken, getProvider } from '../../src/utils';

describe('getToken', () => {
  // Arrange
  const provider = getProvider(ChainId.Goerli, {});

  it('returns Goerli WETH token', async () => {
    // Arrange
    const tokenSymbol = 'KETH';
    const expectedToken = new Token(
      ChainId.Goerli,
      WETH[ChainId.Goerli].toLowerCase(),
      'Wrapped Ether',
      'WETH',
      18,
    );

    // Act
    const currency = await getToken(provider, ChainId.Goerli, tokenSymbol);

    // Assert
    expect(currency).to.eql(expectedToken);
  });

  it('returns Goerli CVX token', async () => {
    // Arrange
    const tokenAddress = CVX[ChainId.Goerli];
    const expectedToken = new Token(
      ChainId.Goerli,
      CVX[ChainId.Goerli].toLowerCase(),
      'Convex Token',
      'CVX',
      18,
    );

    // Act
    const token = await getToken(provider, ChainId.Goerli, tokenAddress);

    // Assert
    expect(token).to.eql(expectedToken);
  });

  it('throws if cannot find token', async () => {
    // Arrange
    const tokenAddress = '0xd502f487e1841fdc805130e13eae80c61186bc98';
    let errorMessage = '';

    // Act
    try {
      await getToken(provider, ChainId.Goerli, tokenAddress);
    } catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    }

    // Assert
    expect(errorMessage).to.eq(`Cannot find token: ${tokenAddress} on ${ChainId[ChainId.Goerli]}`);
  });
});
