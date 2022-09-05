import { formatUnits } from '@ethersproject/units/lib.esm/index.js';
import { BigNumber } from 'ethers';
import { CurrencyValue } from './CurrencyValue';
import { toToken } from './Token';
import { Oracle } from './Oracle';
import { ceilDiv, normalizeTo18Decimals, sqrt } from '../utils';
import { BN_10_18, BN_ZERO } from '../constants';
const MINIMUM_LIQUIDITY = 10 ** 3;
const INITIAL_RATIO_MAX = BigNumber.from(2).pow(112).sub(1);
const PRECISION = BigNumber.from(10).pow(18);
export class Pair {
    constructor(address, first, second, state) {
        this.address = address;
        this.first = first;
        this.second = second;
        this.state = state;
        if (first.chainId !== second.chainId) {
            throw new Error('ChainId mismatch');
        }
        this.inverted =
            toToken(this.second).address.toLowerCase() < toToken(this.first).address.toLowerCase();
        this.oracle = new Oracle(this.inverted ? second.decimals : first.decimals, this.inverted ? first.decimals : second.decimals, state.price);
    }
    getSwapInput(output) {
        if (output.value.isZero()) {
            return;
        }
        if (output.currency === this.first) {
            if (this.inverted) {
                return new CurrencyValue(this.second, this.getSwapAmount0In(output.value));
            }
            else {
                return new CurrencyValue(this.second, this.getSwapAmount1In(output.value));
            }
        }
        else if (output.currency === this.second) {
            if (this.inverted) {
                return new CurrencyValue(this.first, this.getSwapAmount1In(output.value));
            }
            else {
                return new CurrencyValue(this.first, this.getSwapAmount0In(output.value));
            }
        }
        else {
            throw new Error('Invalid parameter');
        }
    }
    getSwapOutput(input) {
        if (input.value.isZero()) {
            return;
        }
        if (input.currency === this.first) {
            if (this.inverted) {
                return new CurrencyValue(this.second, this.getSwapAmount0Out(input.value));
            }
            else {
                return new CurrencyValue(this.second, this.getSwapAmount1Out(input.value));
            }
        }
        else if (input.currency === this.second) {
            if (this.inverted) {
                return new CurrencyValue(this.first, this.getSwapAmount1Out(input.value));
            }
            else {
                return new CurrencyValue(this.first, this.getSwapAmount0Out(input.value));
            }
        }
        else {
            throw new Error('Invalid parameter');
        }
    }
    getEstimatedSwapFee(input) {
        return input.mul(this.state.swapFee).div(PRECISION);
    }
    isEmpty() {
        return this.state.reserve0.isZero() && this.state.reserve1.isZero();
    }
    getFirstReserve() {
        return new CurrencyValue(this.first, this.inverted ? this.state.reserve1 : this.state.reserve0);
    }
    getSecondReserve() {
        return new CurrencyValue(this.second, this.inverted ? this.state.reserve0 : this.state.reserve1);
    }
    getDepositReservesFraction(firstTokenPrice, secondTokenPrice) {
        const firstReserve = this.getFirstReserve();
        const secondReserve = this.getSecondReserve();
        if (firstTokenPrice && secondTokenPrice) {
            const firstReserveValue = normalizeTo18Decimals(firstReserve.value, firstReserve.currency.decimals)
                .mul(firstTokenPrice.price)
                .div(BN_10_18);
            const secondReserveValue = normalizeTo18Decimals(secondReserve.value, secondReserve.currency.decimals)
                .mul(secondTokenPrice.price)
                .div(BN_10_18);
            const upperLimit = BigNumber.from(10).pow(20);
            const lowerLimit = BigNumber.from(10).pow(16);
            if (secondReserveValue.isZero()) {
                return upperLimit;
            }
            let fraction = firstReserveValue.mul(BN_10_18).div(secondReserveValue);
            if (fraction.gt(BN_10_18)) {
                fraction = fraction.mul(2).sub(BN_10_18);
            }
            else if (fraction.lt(BN_10_18)) {
                fraction = BN_10_18.sub(BN_10_18.sub(fraction).mul(2));
            }
            return fraction.gt(upperLimit) ? upperLimit : fraction.lt(lowerLimit) ? lowerLimit : fraction;
        }
    }
    getToken0Symbol() {
        return this.inverted ? this.second.symbol : this.first.symbol;
    }
    getToken1Symbol() {
        return this.inverted ? this.first.symbol : this.second.symbol;
    }
    getToken0Address() {
        return this.inverted ? toToken(this.second).address : toToken(this.first).address;
    }
    getToken1Address() {
        return this.inverted ? toToken(this.first).address : toToken(this.second).address;
    }
    getTotalSupply() {
        return this.state.totalSupply;
    }
    getChainId() {
        if (this.first.chainId === this.second.chainId) {
            return this.first.chainId;
        }
    }
    getFirstLiquidityIn(secondLiquidityIn) {
        if (secondLiquidityIn.currency !== this.second) {
            throw new Error('Invalid parameter');
        }
        const firstReserve = this.getFirstReserve().value;
        const secondReserve = this.getSecondReserve().value;
        if (firstReserve.isZero() || secondReserve.isZero() || secondLiquidityIn.value.isZero()) {
            return;
        }
        return new CurrencyValue(this.first, firstReserve.mul(secondLiquidityIn.value).div(secondReserve));
    }
    getSecondLiquidityIn(firstLiquidityIn) {
        if (firstLiquidityIn.currency !== this.first) {
            throw new Error('Invalid parameter');
        }
        const firstReserve = this.getFirstReserve().value;
        const secondReserve = this.getSecondReserve().value;
        if (firstReserve.isZero() || secondReserve.isZero() || firstLiquidityIn.value.isZero()) {
            return;
        }
        return new CurrencyValue(this.second, secondReserve.mul(firstLiquidityIn.value).div(firstReserve));
    }
    getLiquidity(firstValue, secondValue, proportional) {
        if (this.inverted) {
            const { swapDeposit0Amount, swapDeposit1Amount, liquidity } = this.getRawLiquidity(secondValue, firstValue, proportional);
            return {
                swapDepositFirstAmount: swapDeposit1Amount,
                swapDepositSecondAmount: swapDeposit0Amount,
                liquidity,
            };
        }
        const { swapDeposit0Amount, swapDeposit1Amount, liquidity } = this.getRawLiquidity(firstValue, secondValue, proportional);
        return {
            swapDepositFirstAmount: swapDeposit0Amount,
            swapDepositSecondAmount: swapDeposit1Amount,
            liquidity,
        };
    }
    getBurnOutput(liquidity) {
        if (this.state.totalSupply.isZero()) {
            return {
                first: this.getFirstReserve().map(() => BigNumber.from(0)),
                second: this.getSecondReserve().map(() => BigNumber.from(0)),
            };
        }
        const fee = liquidity.mul(this.state.burnFee).div(PRECISION);
        const effectiveLiquidity = liquidity.sub(fee);
        const first = this.getFirstReserve().map((value) => value.mul(effectiveLiquidity).div(this.state.totalSupply));
        const second = this.getSecondReserve().map((value) => value.mul(effectiveLiquidity).div(this.state.totalSupply));
        return { first, second };
    }
    getInitialRatio() {
        if (this.state.reserve0.isZero() || this.state.reserve1.isZero()) {
            return BigNumber.from(0);
        }
        const initialRatio = this.state.reserve0.mul(PRECISION).div(this.state.reserve1);
        if (initialRatio.gt(INITIAL_RATIO_MAX)) {
            return INITIAL_RATIO_MAX;
        }
        return initialRatio;
    }
    getPrice() {
        return this.state.price;
    }
    getSwapFee() {
        return this.state.swapFee;
    }
    getBurnFee() {
        return this.state.burnFee;
    }
    getMintFee() {
        return this.state.mintFee;
    }
    getSwapAmount0In(amount1Out) {
        const { reserve0, reserve1, swapFee } = this.state;
        const balance1After = reserve1.sub(amount1Out);
        const balance0After = this.oracle.tradeY(balance1After, reserve0, reserve1);
        return ceilDiv(balance0After.sub(reserve0).mul(PRECISION), PRECISION.sub(swapFee));
    }
    getSwapAmount1In(amount0Out) {
        const { reserve0, reserve1, swapFee } = this.state;
        const balance0After = reserve0.sub(amount0Out);
        const balance1After = this.oracle.tradeX(balance0After, reserve0, reserve1);
        return ceilDiv(balance1After.add(1).sub(reserve1).mul(PRECISION), PRECISION.sub(swapFee));
    }
    getSwapAmount0Out(amount1In, updatedReserves) {
        const { reserve0, reserve1 } = updatedReserves
            ? {
                reserve0: updatedReserves[0],
                reserve1: updatedReserves[1],
            }
            : this.state;
        const fee = this.getEstimatedSwapFee(amount1In);
        const balance0After = this.oracle.tradeY(reserve1.add(amount1In).sub(fee), reserve0, reserve1);
        return reserve0.sub(balance0After);
    }
    getSwapAmount1Out(amount0In, updatedReserves) {
        const { reserve0, reserve1 } = updatedReserves
            ? {
                reserve0: updatedReserves[0],
                reserve1: updatedReserves[1],
            }
            : this.state;
        const fee = this.getEstimatedSwapFee(amount0In);
        const balance1After = this.oracle.tradeX(reserve0.add(amount0In).sub(fee), reserve0, reserve1);
        return reserve1.sub(balance1After);
    }
    getRawLiquidity(currency0, currency1, proportional) {
        const amount0 = currency0.value;
        const amount1 = currency1.value;
        if (this.isEmpty()) {
            const liquidity = sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
            return {
                liquidity: liquidity.gt(BN_ZERO) ? liquidity : BN_ZERO,
                swapDeposit0Amount: CurrencyValue.fromString(currency0.currency, '0'),
                swapDeposit1Amount: CurrencyValue.fromString(currency1.currency, '0'),
            };
        }
        const { reserve0, reserve1 } = this.state;
        const { ratio, ratio0, ratio1 } = this.getRatio(amount0, amount1, reserve0, reserve1);
        const initialLiquidity = ratio.mul(this.state.totalSupply).div(PRECISION);
        const mintFee = initialLiquidity.mul(this.state.mintFee).div(PRECISION);
        const effectiveInitialLiquidity = initialLiquidity.sub(mintFee);
        if (!proportional) {
            return {
                liquidity: effectiveInitialLiquidity,
                swapDeposit0Amount: CurrencyValue.fromString(currency0.currency, '0'),
                swapDeposit1Amount: CurrencyValue.fromString(currency1.currency, '0'),
            };
        }
        const [initialDeposit0, initialDeposit1] = this.initialDeposit(ratio);
        const updatedReserve0 = reserve0.add(initialDeposit0);
        const updatedReserve1 = reserve1.add(initialDeposit1);
        const updatedLiquidity = this.state.totalSupply.add(effectiveInitialLiquidity);
        const amount0Left = ratio.eq(ratio0) ? BigNumber.from(0) : amount0.sub(initialDeposit0);
        const amount1Left = ratio.eq(ratio1) ? BigNumber.from(0) : amount1.sub(initialDeposit1);
        const { extraLiquidity, swapDeposit0Amount, swapDeposit1Amount } = this.getExtraLiquidity(amount0Left, amount1Left, updatedReserve0, updatedReserve1, updatedLiquidity);
        return {
            liquidity: effectiveInitialLiquidity.add(extraLiquidity),
            swapDeposit0Amount: CurrencyValue.fromString(currency0.currency, swapDeposit0Amount.lt(0)
                ? '0'
                : formatUnits(swapDeposit0Amount, currency0.currency.decimals)),
            swapDeposit1Amount: CurrencyValue.fromString(currency1.currency, swapDeposit1Amount.lt(0)
                ? '0'
                : formatUnits(swapDeposit1Amount, currency1.currency.decimals)),
        };
    }
    getExtraLiquidity(amount0, amount1, reserve0, reserve1, liquidity) {
        const [extraAmount0, extraAmount1] = !amount0.isZero()
            ? this.swapDeposit0(amount0, reserve0, reserve1)
            : this.swapDeposit1(amount1, reserve0, reserve1);
        const extraRatio = !extraAmount0.isZero() && !extraAmount1.isZero()
            ? this.getRatio(extraAmount0, extraAmount1, reserve0, reserve1).ratio
            : BigNumber.from(0);
        const extraLiquidity = extraRatio.mul(liquidity).div(PRECISION);
        const mintFee = extraLiquidity.mul(this.state.mintFee).div(PRECISION);
        const effectiveExtraLiquidity = extraLiquidity.sub(mintFee);
        return {
            extraLiquidity: effectiveExtraLiquidity.gt(0) ? effectiveExtraLiquidity : BigNumber.from(0),
            swapDeposit0Amount: amount0.isZero() ? extraAmount0 : BigNumber.from(0),
            swapDeposit1Amount: amount1.isZero() ? extraAmount1 : BigNumber.from(0),
        };
    }
    getRatio(amount0, amount1, reserve0, reserve1) {
        const ratio0 = amount0.mul(PRECISION).div(reserve0);
        const ratio1 = amount1.mul(PRECISION).div(reserve1);
        const ratio = ratio0.lt(ratio1) ? ratio0 : ratio1;
        return { ratio, ratio0, ratio1 };
    }
    initialDeposit(ratio) {
        const { reserve0, reserve1 } = this.state;
        return [ratio.mul(reserve0).div(PRECISION), ratio.mul(reserve1).div(PRECISION)];
    }
    swapDeposit0(amount0, updatedReserve0, updatedReserve1) {
        const amount0In = this.getDepositAmount0In(amount0, updatedReserve0, updatedReserve1);
        const amount1Left = this.getSwapAmount1Out(amount0In, [updatedReserve0, updatedReserve1]);
        if (amount1Left.isZero()) {
            return [amount0, amount1Left];
        }
        return [amount0.sub(amount0In), amount1Left];
    }
    swapDeposit1(amount1, updatedReserve0, updatedReserve1) {
        const amount1In = this.getDepositAmount1In(amount1, updatedReserve0, updatedReserve1);
        const amount0Left = this.getSwapAmount0Out(amount1In, [updatedReserve0, updatedReserve1]);
        if (amount0Left.isZero()) {
            return [amount0Left, amount1];
        }
        return [amount0Left, amount1.sub(amount1In)];
    }
    getDepositAmount0In(amount0, updatedReserve0, updatedReserve1) {
        return this.oracle.depositTradeXIn(amount0, updatedReserve0, updatedReserve1);
    }
    getDepositAmount1In(amount1, updatedReserve0, updatedReserve1) {
        return this.oracle.depositTradeYIn(amount1, updatedReserve0, updatedReserve1);
    }
}
//# sourceMappingURL=Pair.js.map