import { providers } from 'ethers';
import { ChainId } from '../constants';

type ApiCredentials = {
  alchemyProjectId?: string;
  etherscanApiKey?: string;
  infuraProjectId?: string;
};

export const getProvider = (
  chainId: ChainId,
  { alchemyProjectId, etherscanApiKey, infuraProjectId }: ApiCredentials,
) => {
  return providers.getDefaultProvider(providers.getNetwork(chainId), {
    ...(alchemyProjectId ? { alchemy: alchemyProjectId } : {}),
    ...(etherscanApiKey ? { etherscan: etherscanApiKey } : {}),
    ...(infuraProjectId ? { infura: infuraProjectId } : {}),
  });
};
