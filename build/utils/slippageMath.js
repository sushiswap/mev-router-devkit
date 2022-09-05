export function getInputValueWithSlippage(input, slippageTolerance, slippageToleranceDenominator) {
    let inputValueWithSlippage = input;
    inputValueWithSlippage = input.map((x) => x.mul(slippageToleranceDenominator + slippageTolerance).div(slippageToleranceDenominator));
    return inputValueWithSlippage;
}
export function getOutputValueWithSlippage(output, slippageTolerance, slippageToleranceDenominator) {
    let outputValueWithSlippage = output;
    outputValueWithSlippage = output.map((x) => x.mul(slippageToleranceDenominator - slippageTolerance).div(slippageToleranceDenominator));
    return outputValueWithSlippage;
}
//# sourceMappingURL=slippageMath.js.map