import { BigNumber } from 'ethers';
import { formatUnits } from '@ethersproject/units/lib.esm/index.js';
import { Currency } from './Currency';
import { bigNumberFromString } from '../utils';

export class CurrencyValue {
  constructor(readonly currency: Currency, readonly value: BigNumber) {}

  static fromString(currency: Currency, value: string) {
    return new CurrencyValue(currency, bigNumberFromString(currency.decimals, value));
  }

  toString() {
    const result = formatUnits(this.value, this.currency.decimals);
    if (result.endsWith('.0')) {
      return result.substring(0, result.length - 2);
    }
    return result;
  }

  format() {
    return formatCurrency(this.currency.decimals, this.value);
  }

  formatWithSymbol() {
    return `${formatCurrency(this.currency.decimals, this.value)} ${this.currency.symbol}`;
  }

  lt(currencyValue: CurrencyValue) {
    if (this.currency !== currencyValue.currency) {
      throw new Error('Cannot compare different currencies');
    }
    return this.value.lt(currencyValue.value);
  }

  map(fn: (value: BigNumber) => BigNumber) {
    return new CurrencyValue(this.currency, fn(this.value));
  }
}

const SIGNIFICANT_DIGITS = 6;

export function formatCurrency(decimals: number, value: BigNumber): string {
  let stringified = value.toString();
  const negative = stringified.startsWith('-');
  if (negative) {
    stringified = stringified.substring(1);
  }

  let decimalPart =
    stringified.length <= decimals
      ? stringified.padStart(decimals, '0')
      : stringified.substring(stringified.length - decimals);
  decimalPart = stripEndZeroes(decimalPart);

  let integerPart =
    stringified.length <= decimals ? '0' : stringified.substring(0, stringified.length - decimals);
  integerPart = applyCommaSeparator(integerPart);

  const uncut = decimalPart !== '' ? `${integerPart}.${decimalPart}` : integerPart;
  return `${negative ? '-' : ''}${cutToSignificantDigits(uncut)}`;
}

function applyCommaSeparator(value: string) {
  const commaCount = value.length / 3;
  const resultValue = value.split('');
  for (let i = 1; i < commaCount; i++) {
    resultValue.splice(-4 * i + 1, 0, ',');
  }
  return resultValue.join('');
}

function stripEndZeroes(value: string) {
  return value.replace(/0+$/, '');
}

function cutToSignificantDigits(value: string) {
  if (!value.includes('.')) {
    return value;
  }
  let digitsFound = 0;
  let separatorFound = false;
  let leadingZero = true;
  for (let i = 0; i < value.length; i++) {
    if ((value[i] === '0' && leadingZero) || value[i] === ',') {
      continue;
    }
    if (value[i] === '.') {
      separatorFound = true;
      if (digitsFound >= SIGNIFICANT_DIGITS) {
        return value.substring(0, i);
      }
      continue;
    }
    if (value[i] !== '0') {
      leadingZero = false;
    }
    if (!leadingZero) {
      digitsFound++;
      if (separatorFound && digitsFound >= SIGNIFICANT_DIGITS) {
        return value.substring(0, i + 1);
      }
    }
  }
  return value;
}
