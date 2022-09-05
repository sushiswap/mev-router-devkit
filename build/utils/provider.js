import { providers } from 'ethers';
export const getProvider = (chainId, { alchemyProjectId, etherscanApiKey, infuraProjectId }) => {
    return providers.getDefaultProvider(providers.getNetwork(chainId), {
        ...(alchemyProjectId ? { alchemy: alchemyProjectId } : {}),
        ...(etherscanApiKey ? { etherscan: etherscanApiKey } : {}),
        ...(infuraProjectId ? { infura: infuraProjectId } : {}),
    });
};
//# sourceMappingURL=provider.js.map