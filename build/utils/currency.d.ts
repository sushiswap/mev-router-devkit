import { BaseProvider } from '@ethersproject/providers/lib.esm/index.js';
import { ChainId } from '../constants';
import { Cache, Token } from '../model';
export declare function getToken(provider: BaseProvider, chainId: ChainId, tokenAddressOrSymbol: string, cache?: Cache): Promise<Token>;
