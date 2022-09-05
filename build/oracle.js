import { Interface } from '@ethersproject/abi';
import { ORACLE_ABI } from './constants';
import { multicall } from './utils';
export class TwapOracle {
    static async getTokensDecimals(provider, chainId, oracleAddress) {
        const results = await multicall(provider, chainId, [
            {
                target: oracleAddress,
                callData: this.ORACLE_CODER.encodeFunctionData('xDecimals'),
            },
            {
                target: oracleAddress,
                callData: this.ORACLE_CODER.encodeFunctionData('yDecimals'),
            },
        ]);
        const token0Decimals = this.ORACLE_CODER.decodeFunctionResult('xDecimals', results[0])[0];
        const token1Decimals = this.ORACLE_CODER.decodeFunctionResult('yDecimals', results[1])[0];
        return [token0Decimals, token1Decimals];
    }
}
TwapOracle.ORACLE_CODER = new Interface(ORACLE_ABI);
//# sourceMappingURL=oracle.js.map