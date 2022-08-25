import { Interface } from '@ethersproject/abi/lib.esm/index.js';
import { BaseProvider } from '@ethersproject/providers/lib.esm/index.js';
import { Contract } from 'ethers';
import { ChainId, MULTICALL_ABI, MULTICALL_ADDRESS } from '../constants';

export const multicall = async (
  provider: BaseProvider,
  chainId: ChainId,
  calls: { target: string; callData: any }[],
) => {
  const multicallContract = new Contract(MULTICALL_ADDRESS[chainId], MULTICALL_ABI, provider);
  const { returnData } = await multicallContract.callStatic.aggregate(calls);
  return returnData;
};

export const multicallFunctionCall = () => {
  const multicallEncoder = new Interface(MULTICALL_ABI);
  return {
    encode: (method: string, callData: any) => ({
      target: MULTICALL_ADDRESS[ChainId.Mainnet],
      callData: multicallEncoder.encodeFunctionData(method, callData),
    }),
    decode: (method: string, returnData: any) =>
      multicallEncoder.decodeFunctionResult(method, returnData),
  };
};
