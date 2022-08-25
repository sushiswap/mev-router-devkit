import { BigNumber } from 'ethers';
import { BN_ZERO } from '../constants';

export class Oracle {
  private decimalsConverter: BigNumber;

  constructor(public xDecimals: number, public yDecimals: number, public price: BigNumber) {
    if (Math.abs(xDecimals - yDecimals) > 18) {
      throw new Error('Decimals difference too big');
    }
    this.decimalsConverter = BigNumber.from(10).pow(18 + xDecimals - yDecimals);
  }

  // TRADE

  tradeX(xAfter: BigNumber, xBefore: BigNumber, yBefore: BigNumber) {
    const yTraded = xAfter.sub(xBefore).mul(this.price);
    const yAfter = yBefore.mul(this.decimalsConverter).sub(yTraded).div(this.decimalsConverter);
    if (yAfter.lt(0)) throw new Error('Negative yAfter');
    return yAfter;
  }

  tradeY(yAfter: BigNumber, xBefore: BigNumber, yBefore: BigNumber) {
    const xTraded = yAfter.sub(yBefore).mul(this.decimalsConverter);
    const xAfter = xBefore.mul(this.price).sub(xTraded).div(this.price);
    if (xAfter.lt(0)) throw new Error('Negative xAfter');
    return xAfter;
  }

  // DEPOSIT

  depositTradeXIn(xLeft: BigNumber, xBefore: BigNumber, yBefore: BigNumber) {
    if (xBefore.isZero() || yBefore.isZero()) {
      return BN_ZERO;
    }

    const numerator = xLeft.mul(yBefore);
    const denominator = this.price.mul(xLeft.add(xBefore)).add(yBefore.mul(this.decimalsConverter));
    const xIn = numerator.mul(this.decimalsConverter).div(denominator);

    if (xIn.mul(this.price).div(this.decimalsConverter).gte(yBefore) || xIn.gte(xLeft)) {
      return BN_ZERO;
    }

    return xIn;
  }

  depositTradeYIn(yLeft: BigNumber, xBefore: BigNumber, yBefore: BigNumber) {
    if (xBefore.isZero() || yBefore.isZero()) {
      return BN_ZERO;
    }

    const numerator = this.price.mul(xBefore).mul(yLeft);
    const denominator = this.price.mul(xBefore).add(yLeft.add(yBefore).mul(this.decimalsConverter));
    const yIn = numerator.div(denominator);

    if (yIn.mul(this.decimalsConverter).div(this.price).gte(xBefore) || yIn.gte(yLeft)) {
      return BN_ZERO;
    }

    return yIn;
  }
}
