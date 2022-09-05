/// <reference path="../src/jsbi.d.ts" />
import { BigNumber } from 'ethers';
export declare const UNISWAPV2_FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
export declare const UNISWAPV2_INIT_CODE_HASH = "0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f";
export declare const MINIMUM_LIQUIDITY: bigint;
export declare const ZERO: import("JSBI").JSBI;
export declare const ONE: import("JSBI").JSBI;
export declare const FIVE: import("JSBI").JSBI;
export declare const _997: import("JSBI").JSBI;
export declare const _1000: import("JSBI").JSBI;
export declare const DEFAULT_SETTINGS: {
    gasPriceMultiplier: number;
    gasLimitOverpay: number;
    submitDeadline: number;
};
export declare const SETTINGS_DENOMINATORS: {
    gasPriceMultiplier: number;
    slippageTolerance: number;
    depositSlippageTolerance: number;
};
export declare enum ChainId {
    Mainnet = 1,
    Goerli = 5,
    Ganache = 1337
}
export declare const CHAIN_ID_NAMES: {
    1: string;
    5: string;
    1337: string;
};
export declare const EXECUTE_DEPOSIT_GAS_LIMIT = 630000;
export declare const EXECUTE_BUY_GAS_LIMIT = 480000;
export declare const EXECUTE_SELL_GAS_LIMIT = 480000;
export declare const EXECUTE_WITHDRAW_GAS_LIMIT = 380000;
export declare const BN_10_18: BigNumber;
export declare const BN_ZERO: BigNumber;
export declare const BN_ONE: BigNumber;
export declare const BN_TWO: BigNumber;
export declare const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export declare const MULTICALL_ADDRESS: {
    1: string;
    1337: string;
};
export declare const FACTORY_ADDRESS: {
    1: string;
    1337: string;
};
export declare const READER_ADDRESS: {
    1: string;
    5: string;
    1337: string;
};
export declare const DELAY_ADDRESS: {
    1: string;
    5: string;
    1337: string;
};
export declare const SUSHIGUARD_ROUTERV01_ADDRESS: {
    1: string;
    5: string;
    1337: string;
};
export declare const WBTC: {
    1: string;
    1337: string;
};
export declare const USDC: {
    1: string;
    5: string;
    1337: string;
};
export declare const USDT: {
    1: string;
    1337: string;
};
export declare const DAI: {
    1: string;
    1337: string;
};
export declare const WETH: {
    1: string;
    1337: string;
};
export declare const LINK: {
    1: string;
    1337: string;
};
export declare const CRV: {
    1: string;
    1337: string;
};
export declare const CVX: {
    1: string;
    1337: string;
};
export declare const SUSHI: {
    1: string;
    1337: string;
};
export declare const WETH_USDC: {
    1: string;
    1337: string;
};
export declare const WETH_CVX: {
    1: string;
    1337: string;
};
export declare const WETH_SUSHI: {
    1: string;
    1337: string;
};
export declare const ERC20_ABI: string[];
export declare const PAIR_ABI: string[];
export declare const ORACLE_ABI: string[];
export declare const UNISWAP_V2_PAIR_ABI: string[];
export declare const UNISWAP_V3_POOL_ABI: string[];
export declare const READER_ABI: string[];
export declare const FACTORY_ABI: string[];
export declare const MULTICALL_ABI: string[];
