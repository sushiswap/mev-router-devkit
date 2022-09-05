import { WETH_CVX, WETH_SUSHI, WETH_USDC } from './addresses';
import { ChainId } from './chains';
import { Weth, Usdc, Cvx, Sushi, GoerliWeth, GoerliUSDCoin, GoerliCvx, GoerliSushi, GanacheWeth, GanacheUSDCoin, } from './currencies';
export const MAINNET_PAIRS = [
    { address: WETH_USDC[ChainId.Mainnet], tokens: [Weth, Usdc] },
    { address: WETH_CVX[ChainId.Mainnet], tokens: [Weth, Cvx] },
    { address: WETH_SUSHI[ChainId.Mainnet], tokens: [Weth, Sushi] },
];
export const GOERLI_PAIRS = [
    { address: WETH_USDC[ChainId.Goerli], tokens: [GoerliWeth, GoerliUSDCoin] },
    { address: WETH_CVX[ChainId.Goerli], tokens: [GoerliWeth, GoerliCvx] },
    { address: WETH_SUSHI[ChainId.Goerli], tokens: [GoerliWeth, GoerliSushi] },
];
export const GANACHE_PAIRS = [
    { address: WETH_USDC[ChainId.Ganache], tokens: [GanacheWeth, GanacheUSDCoin] },
];
export const PAIRS = [
    ...MAINNET_PAIRS,
    ...GOERLI_PAIRS,
    ...GANACHE_PAIRS,
];
export const PAIRS_BY_CHAIN = {
    [ChainId.Mainnet]: MAINNET_PAIRS,
    [ChainId.Goerli]: GOERLI_PAIRS,
    [ChainId.Ganache]: GANACHE_PAIRS,
};
//# sourceMappingURL=pairs.js.map