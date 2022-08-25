import { CurrencyValue } from '../model';

export function getInputValueWithSlippage(
  input: CurrencyValue,
  slippageTolerance: number,
  slippageToleranceDenominator: number,
): CurrencyValue {
  let inputValueWithSlippage = input;
  inputValueWithSlippage = input.map((x) =>
    x.mul(slippageToleranceDenominator + slippageTolerance).div(slippageToleranceDenominator),
  );
  return inputValueWithSlippage;
}

export function getOutputValueWithSlippage(
  output: CurrencyValue,
  slippageTolerance: number,
  slippageToleranceDenominator: number,
): CurrencyValue {
  let outputValueWithSlippage = output;
  outputValueWithSlippage = output.map((x) =>
    x.mul(slippageToleranceDenominator - slippageTolerance).div(slippageToleranceDenominator),
  );
  return outputValueWithSlippage;
}
