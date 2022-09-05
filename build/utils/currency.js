import { ChainId, NATIVE_CURRENCY, WETH } from '../constants';
import { TwapPair } from '../pair';
export async function getToken(provider, chainId, tokenAddressOrSymbol, cache) {
    let tokenAddress = null;
    if (tokenAddressOrSymbol.toLowerCase() === NATIVE_CURRENCY[chainId].symbol.toLowerCase()) {
        tokenAddress = WETH[chainId].toLowerCase();
    }
    else {
        tokenAddress = tokenAddressOrSymbol.toLowerCase();
    }
    if (cache) {
        const key = `getToken/${tokenAddress}`;
        const token = await cache.get(key);
        if (token) {
            return JSON.parse(token);
        }
    }
    try {
        const token = await TwapPair.getToken(provider, chainId, tokenAddress);
        if (token && cache) {
            await cache.set(`getToken/${token.address}`, JSON.stringify(token));
        }
        return token;
    }
    catch (error) {
        throw new Error(`Cannot find token: ${tokenAddress} on ${ChainId[chainId]}`);
    }
}
//# sourceMappingURL=currency.js.map