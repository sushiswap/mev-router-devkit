import { Interface } from '@ethersproject/abi/lib.esm/index.js';
import { BigNumber } from 'ethers';
import { multicall } from './utils';
import { ERC20_ABI, PAIR_ABI, READER_ABI, READER_ADDRESS } from './constants';
import { TwapFactory } from './factory.js';
import { Pair, toToken } from './model';
export class TwapReader {
    static async getPair(provider, chainId, currencyA, currencyB) {
        const tokenA = toToken(currencyA);
        const tokenB = toToken(currencyB);
        const [first, second] = BigNumber.from(tokenA.address).lt(BigNumber.from(tokenB.address))
            ? [tokenA, tokenB]
            : [tokenB, tokenA];
        const pairAddress = await TwapFactory.getPairAddress(provider, chainId, first, second);
        if (pairAddress) {
            const state = await this._getPairParameters(provider, chainId, pairAddress);
            return new Pair(pairAddress, first, second, state);
        }
    }
    static async _getPairParameters(provider, chainId, pairAddress) {
        const results = await multicall(provider, chainId, [
            {
                target: READER_ADDRESS[chainId],
                callData: this.READER_CODER.encodeFunctionData('getPairParameters', [pairAddress]),
            },
            {
                target: pairAddress,
                callData: this.PAIR_CODER.encodeFunctionData('totalSupply'),
            },
        ]);
        const [, reserve0, reserve1, price, mintFee, burnFee, swapFee] = this.READER_CODER.decodeFunctionResult('getPairParameters', results[0]);
        const totalSupply = this.PAIR_CODER.decodeFunctionResult('totalSupply', results[1])[0];
        return {
            reserve0,
            reserve1,
            price,
            mintFee,
            burnFee,
            swapFee,
            totalSupply,
        };
    }
}
TwapReader.READER_CODER = new Interface(READER_ABI);
TwapReader.PAIR_CODER = new Interface([...ERC20_ABI, ...PAIR_ABI]);
//# sourceMappingURL=reader.js.map