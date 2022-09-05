import { BigNumber } from '@ethersproject/bignumber/lib.esm/index.js';
import { BaseProvider } from '@ethersproject/providers/lib.esm/index.js';
import { ChainId } from './constants';
import { CurrencyValue, Pair } from './model';
export interface CallOptions {
    gasPrice?: BigNumber;
    slippageToleranceDenominator?: number;
    gasPriceMultiplier?: number;
    gasPriceDenominator?: number;
    depositSlippageDenominator?: number;
    gasLimitOverpay?: number;
    submitDeadline?: number;
}
export declare abstract class TwapDelay {
    private static DELAY_CODER;
    static getBuyCallParameters(provider: BaseProvider, chainId: ChainId, to: string, input: CurrencyValue, output: CurrencyValue, slippageTolerance: number, options?: CallOptions): Promise<{
        contractAddress: string;
        methodName: string;
        calldata: string;
        value: BigNumber;
    }>;
    static getSellCallParameters(provider: BaseProvider, chainId: ChainId, to: string, input: CurrencyValue, output: CurrencyValue, slippageTolerance: number, options?: CallOptions): Promise<{
        contractAddress: string;
        methodName: string;
        calldata: string;
        value: BigNumber;
    }>;
    static getWithdrawCallParameters(provider: BaseProvider, chainId: ChainId, to: string, firstValue: CurrencyValue, secondValue: CurrencyValue, liquidity: BigNumber, options?: CallOptions): Promise<{
        contractAddress: string;
        methodName: string;
        calldata: string;
        value: BigNumber;
    }>;
    static getDepositCallParameters(provider: BaseProvider, chainId: ChainId, to: string, firstValue: CurrencyValue, secondValue: CurrencyValue, slippageTolerance: number, pair: Pair, swapOnDeposit: boolean, options?: CallOptions): Promise<{
        contractAddress: string;
        methodName: string;
        calldata: string;
        value: BigNumber;
    }>;
    static getGasPrice(provider: BaseProvider, chainId: ChainId): Promise<BigNumber>;
    static getOrderStatuses(provider: BaseProvider, chainId: ChainId, orderIds: number[]): Promise<{
        orderId: number;
        status: number;
    }[]>;
    static getOrderStatus(provider: BaseProvider, chainId: ChainId, orderId: number): Promise<number>;
}
