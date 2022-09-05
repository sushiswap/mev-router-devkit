import { providers } from 'ethers';
import { ChainId } from '../constants';
declare type ApiCredentials = {
    alchemyProjectId?: string;
    etherscanApiKey?: string;
    infuraProjectId?: string;
};
export declare const getProvider: (chainId: ChainId, { alchemyProjectId, etherscanApiKey, infuraProjectId }: ApiCredentials) => providers.BaseProvider;
export {};
