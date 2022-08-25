import { expect } from 'chai';
import { ChainId, GoerliEther, GoerliUSDCoin } from '../src/constants';
import { CurrencyValue, OrderStatus } from '../src/model';
import { CallOptions, TwapDelay } from '../src/delay';
import { BigNumber } from 'ethers';
import { getProvider } from '../src/utils';

describe('TwapDelay', () => {
  const provider = getProvider(ChainId.Goerli, {});

  describe('TwapDelay.getBuyCallParameters', () => {
    it('returns buy call parameters', async () => {
      // Arrange
      const account = '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7';
      const first = new CurrencyValue(GoerliEther, BigNumber.from(9));
      const second = new CurrencyValue(GoerliUSDCoin, BigNumber.from(10));
      const options = {
        gasPrice: BigNumber.from('1000'),
        gasPriceMultiplier: 1,
        gasLimitOverpay: 1,
        submitDeadline: 1,
      } as CallOptions;
      const slippageTolerance = 1;

      // Act
      const callParameters = await TwapDelay.getBuyCallParameters(
        provider,
        ChainId.Goerli,
        account,
        first,
        second,
        slippageTolerance,
        options,
      );

      // Assert
      expect(callParameters.calldata).to.contain(
        '0x5051349a000000000000000000000000d0a1e359811322d97991e03f863a0c30c2cf029c000000000000000000000000b922e0b5c8ffa89fe6195a581acc7d292b9241420000000000000000000000000000000000000000000000000000000000000009000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000100000000000000000000000089205a3a3b2a69de6dbf7f01ed13b2108b2c43e70000000000000000000000000000000000000000000000000000000000075301',
      );
      expect(callParameters.value._hex).to.eq('0x07530a');
    });
  });

  describe('TwapDelay.getSellCallParameters', () => {
    it('returns sell call parameters', async () => {
      // Arrange
      const account = '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7';
      const first = new CurrencyValue(GoerliEther, BigNumber.from(2));
      const second = new CurrencyValue(GoerliUSDCoin, BigNumber.from(20));
      const gasPrice = BigNumber.from('1000');
      const options = {
        gasPrice: BigNumber.from('1000'),
        gasPriceMultiplier: 1,
        gasLimitOverpay: 1,
        submitDeadline: 1,
      } as CallOptions;
      const slippageTolerance = 1;

      // Act
      const callParameters = await TwapDelay.getSellCallParameters(
        provider,
        ChainId.Goerli,
        account,
        first,
        second,
        slippageTolerance,
        options,
      );

      // Assert
      expect(callParameters.calldata).to.contain(
        '0xba4d5312000000000000000000000000d0a1e359811322d97991e03f863a0c30c2cf029c000000000000000000000000b922e0b5c8ffa89fe6195a581acc7d292b92414200000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000013000000000000000000000000000000000000000000000000000000000000000100000000000000000000000089205a3a3b2a69de6dbf7f01ed13b2108b2c43e70000000000000000000000000000000000000000000000000000000000075301',
      );
      expect(callParameters.value._hex).to.eq('0x075303');
    });
  });

  describe('TwapDelay.getGasPrice', () => {
    it('returns gas price', async () => {
      // Act
      const gasPrice = await TwapDelay.getGasPrice(provider, ChainId.Goerli);

      // Assert
      expect(gasPrice).to.be.instanceOf(BigNumber);
    });
  });

  describe('TwapDelay.getOrderStatus', () => {
    it('returns ExecutedSucceeded order status', async () => {
      // Act
      const orderStatus = await TwapDelay.getOrderStatus(provider, ChainId.Goerli, 1);

      // Assert
      expect(orderStatus).to.eq(OrderStatus.ExecutedSucceeded);
    });

    it('returns NonExistent order status', async () => {
      // Act
      const orderStatus = await TwapDelay.getOrderStatus(provider, ChainId.Goerli, 1000000000);

      // Assert
      expect(orderStatus).to.eq(OrderStatus.NonExistent);
    });
  });

  describe('TwapDelay.getOrderStatuses', () => {
    it('returns order statuses', async () => {
      // Arrange
      const expectedOrderStatuses = [
        {
          orderId: 1,
          status: 3,
        },
        {
          orderId: 2,
          status: 3,
        },
      ];

      // Act
      const orderStatuses = await TwapDelay.getOrderStatuses(provider, ChainId.Goerli, [1, 2]);

      // Assert
      expect(orderStatuses[0].orderId).to.eq(expectedOrderStatuses[0].orderId);
      expect(orderStatuses[0].status).to.eq(expectedOrderStatuses[0].status);
      expect(orderStatuses[1].orderId).to.eq(expectedOrderStatuses[1].orderId);
      expect(orderStatuses[1].status).to.eq(expectedOrderStatuses[1].status);
    });
  });
});
