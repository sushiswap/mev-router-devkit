import { ChainId, NATIVE_CURRENCY, WRAPPED_ETHER } from '../constants';
import { Currency } from './Currency';

export class Token extends Currency {
  constructor(
    readonly chainId: ChainId,
    readonly address: string,
    readonly name: string,
    readonly symbol: string,
    readonly decimals: number,
  ) {
    super(chainId, name, symbol, decimals);
  }
}

export function isToken(currency: Currency): currency is Token {
  return currency instanceof Token;
}

export function toToken(currency: Currency): Token {
  if (currency === NATIVE_CURRENCY[currency.chainId]) {
    return WRAPPED_ETHER[currency.chainId];
  }
  if (isToken(currency)) {
    return currency;
  }
  throw new Error('Cannot convert to token');
}
