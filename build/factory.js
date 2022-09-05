import { Interface } from '@ethersproject/abi/lib.esm/index.js';
import { multicall } from './utils';
import { ADDRESS_ZERO, FACTORY_ABI, FACTORY_ADDRESS } from './constants';
import { toToken } from './model';
export class TwapFactory {
    static async getPairAddress(provider, chainId, first, second, cache, ttlSeconds) {
        const firstToken = toToken(first);
        const secondToken = toToken(second);
        if (firstToken === secondToken) {
            throw new Error('Pair for identical tokens');
        }
        const key = `getPairAddress/${first.symbol}/${second.symbol}`;
        if (cache) {
            const pairAddress = await cache.get(key);
            if (pairAddress) {
                return pairAddress;
            }
        }
        const results = await multicall(provider, chainId, [
            {
                target: FACTORY_ADDRESS[chainId],
                callData: this.FACTORY_CODER.encodeFunctionData('getPair', [
                    firstToken.address,
                    secondToken.address,
                ]),
            },
        ]);
        const decodedPairAddress = this.FACTORY_CODER.decodeFunctionResult('getPair', results[0])[0];
        const pairAddress = decodedPairAddress !== ADDRESS_ZERO ? decodedPairAddress : undefined;
        if (pairAddress && cache) {
            await cache.set(key, pairAddress, ttlSeconds);
        }
        return pairAddress?.toLowerCase();
    }
    static async getPairCount(provider, chainId) {
        const results = await multicall(provider, chainId, [
            {
                target: FACTORY_ADDRESS[chainId],
                callData: this.FACTORY_CODER.encodeFunctionData('allPairsLength'),
            },
        ]);
        const pairsLength = this.FACTORY_CODER.decodeFunctionResult('allPairsLength', results[0])[0];
        return pairsLength?.toNumber();
    }
    static async getPairAddressById(provider, chainId, id) {
        const results = await multicall(provider, chainId, [
            {
                target: FACTORY_ADDRESS[chainId],
                callData: this.FACTORY_CODER.encodeFunctionData('allPairs', [id]),
            },
        ]);
        const pairAddress = this.FACTORY_CODER.decodeFunctionResult('allPairs', results[0])[0];
        return pairAddress?.toLowerCase();
    }
}
TwapFactory.FACTORY_CODER = new Interface(FACTORY_ABI);
//# sourceMappingURL=factory.js.map