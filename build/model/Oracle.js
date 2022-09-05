import { BigNumber } from 'ethers';
import { BN_ZERO } from '../constants';
export class Oracle {
    constructor(xDecimals, yDecimals, price) {
        this.xDecimals = xDecimals;
        this.yDecimals = yDecimals;
        this.price = price;
        if (Math.abs(xDecimals - yDecimals) > 18) {
            throw new Error('Decimals difference too big');
        }
        this.decimalsConverter = BigNumber.from(10).pow(18 + xDecimals - yDecimals);
    }
    tradeX(xAfter, xBefore, yBefore) {
        const yTraded = xAfter.sub(xBefore).mul(this.price);
        const yAfter = yBefore.mul(this.decimalsConverter).sub(yTraded).div(this.decimalsConverter);
        if (yAfter.lt(0))
            throw new Error('Negative yAfter');
        return yAfter;
    }
    tradeY(yAfter, xBefore, yBefore) {
        const xTraded = yAfter.sub(yBefore).mul(this.decimalsConverter);
        const xAfter = xBefore.mul(this.price).sub(xTraded).div(this.price);
        if (xAfter.lt(0))
            throw new Error('Negative xAfter');
        return xAfter;
    }
    depositTradeXIn(xLeft, xBefore, yBefore) {
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
    depositTradeYIn(yLeft, xBefore, yBefore) {
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
//# sourceMappingURL=Oracle.js.map