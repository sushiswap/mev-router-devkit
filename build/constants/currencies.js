import { Currency, Token, isToken } from '../model';
import { WBTC, WETH, USDC, USDT, DAI, LINK, CRV, CVX, SUSHI } from './addresses';
import { ChainId } from './chains';
export const Ether = new Currency(ChainId.Mainnet, 'Ether', 'ETH', 18);
export const Wbtc = new Token(ChainId.Mainnet, WBTC[ChainId.Mainnet], 'Wrapped Bitcoin', 'WBTC', 8);
export const Usdc = new Token(ChainId.Mainnet, USDC[ChainId.Mainnet], 'USD Coin', 'USDC', 6);
export const Usdt = new Token(ChainId.Mainnet, USDT[ChainId.Mainnet], 'Tether USD', 'USDT', 6);
export const Dai = new Token(ChainId.Mainnet, DAI[ChainId.Mainnet], 'Dai', 'DAI', 18);
export const Weth = new Token(ChainId.Mainnet, WETH[ChainId.Mainnet], 'Wrapped Ether', 'WETH', 18);
export const Link = new Token(ChainId.Mainnet, LINK[ChainId.Mainnet], 'ChainLink Token', 'LINK', 18);
export const Crv = new Token(ChainId.Mainnet, CRV[ChainId.Mainnet], 'Curve DAO Token', 'CRV', 18);
export const Cvx = new Token(ChainId.Mainnet, CVX[ChainId.Mainnet], 'Convex Token', 'CVX', 18);
export const Sushi = new Token(ChainId.Mainnet, SUSHI[ChainId.Mainnet], 'SushiToken', 'SUSHI', 18);
export const MAINNET_CURRENCIES = [Ether, Wbtc, Usdc, Usdt, Dai, Link, Crv, Weth, Cvx, Sushi];
export const GoerliEther = new Currency(ChainId.Goerli, 'Goerli Ether', 'KETH', 18);
export const GoerliWeth = new Token(ChainId.Goerli, WETH[ChainId.Goerli], 'Wrapped Goerli Ether', 'WETH', 18);
export const GoerliWrappedBitcoin = new Token(ChainId.Goerli, WBTC[ChainId.Goerli], 'Wrapped Bitcoin', 'WBTC', 8);
export const GoerliUSDCoin = new Token(ChainId.Goerli, USDC[ChainId.Goerli], 'USD Coin', 'USDC', 6);
export const GoerliTetherUSD = new Token(ChainId.Goerli, USDT[ChainId.Goerli], 'Tether USD', 'USDT', 6);
export const GoerliDai = new Token(ChainId.Goerli, DAI[ChainId.Goerli], 'Dai Stablecoin', 'DAI', 18);
export const GoerliLink = new Token(ChainId.Goerli, LINK[ChainId.Goerli], 'ChainLink Token', 'LINK', 18);
export const GoerliCrv = new Token(ChainId.Goerli, CRV[ChainId.Goerli], 'Curve DAO Token', 'CRV', 18);
export const GoerliCvx = new Token(ChainId.Goerli, CVX[ChainId.Goerli], 'Convex Token', 'CVX', 18);
export const GoerliSushi = new Token(ChainId.Goerli, SUSHI[ChainId.Goerli], 'SushiToken', 'SUSHI', 18);
export const GOERLI_CURRENCIES = [
    GoerliEther,
    GoerliWeth,
    GoerliWrappedBitcoin,
    GoerliUSDCoin,
    GoerliTetherUSD,
    GoerliDai,
    GoerliLink,
    GoerliCrv,
    GoerliCvx,
    GoerliSushi,
];
export const GanacheEther = new Currency(ChainId.Ganache, 'Ganache Ether', 'GETH', 18);
export const GanacheWeth = new Token(ChainId.Ganache, WETH[ChainId.Ganache], 'Wrapped Ganache Ether', 'WETH', 18);
export const GanacheWrappedBitcoin = new Token(ChainId.Ganache, WBTC[ChainId.Ganache], 'Ganache Wrapped Bitcoin', 'WBTC', 8);
export const GanacheUSDCoin = new Token(ChainId.Ganache, USDC[ChainId.Ganache], 'Ganache USD Coin', 'USDC', 6);
export const GanacheTetherUSD = new Token(ChainId.Ganache, USDT[ChainId.Ganache], 'Ganache Tether USD', 'USDT', 6);
export const GanacheDai = new Token(ChainId.Ganache, DAI[ChainId.Ganache], 'Ganache Dai', 'DAI', 18);
export const GanacheLink = new Token(ChainId.Ganache, LINK[ChainId.Ganache], 'Ganache ChainLink', 'LINK', 18);
export const GanacheCrv = new Token(ChainId.Ganache, CRV[ChainId.Ganache], 'Ganache Curve DAO Token', 'CRV', 18);
export const GANACHE_CURRENCIES = [
    GanacheEther,
    GanacheWeth,
    GanacheWrappedBitcoin,
    GanacheUSDCoin,
    GanacheTetherUSD,
    GanacheDai,
    GanacheLink,
    GanacheCrv,
];
export const CURRENCIES = {
    [ChainId.Mainnet]: MAINNET_CURRENCIES,
    [ChainId.Goerli]: GOERLI_CURRENCIES,
    [ChainId.Ganache]: GANACHE_CURRENCIES,
};
export const TOKENS = {
    [ChainId.Mainnet]: MAINNET_CURRENCIES.filter(isToken),
    [ChainId.Goerli]: GOERLI_CURRENCIES.filter(isToken),
    [ChainId.Ganache]: GANACHE_CURRENCIES.filter(isToken),
};
export const NATIVE_CURRENCY = {
    [ChainId.Mainnet]: Ether,
    [ChainId.Goerli]: GoerliEther,
    [ChainId.Ganache]: GanacheEther,
};
export const WRAPPED_ETHER = {
    [ChainId.Mainnet]: Weth,
    [ChainId.Goerli]: GoerliWeth,
    [ChainId.Ganache]: GanacheWeth,
};
//# sourceMappingURL=currencies.js.map