import { NATIVE_CURRENCY, WRAPPED_ETHER } from '../constants';
import { Currency } from './Currency';
export class Token extends Currency {
    constructor(chainId, address, name, symbol, decimals) {
        super(chainId, name, symbol, decimals);
        this.chainId = chainId;
        this.address = address;
        this.name = name;
        this.symbol = symbol;
        this.decimals = decimals;
    }
}
export function isToken(currency) {
    return currency instanceof Token;
}
export function toToken(currency) {
    if (currency === NATIVE_CURRENCY[currency.chainId]) {
        return WRAPPED_ETHER[currency.chainId];
    }
    if (isToken(currency)) {
        return currency;
    }
    throw new Error('Cannot convert to token');
}
//# sourceMappingURL=Token.js.map