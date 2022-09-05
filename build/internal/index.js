export const CHAIN_ID = {
    MAINNET: 1,
    ROPSTEN: 3,
    GOERLI: 5,
    CRONOS: 25,
    BSC: 56,
    MATIC: 137,
    FANTOM: 250,
    AVAX: 43114,
};
export const NETWORK_HANDLERS = {
    [CHAIN_ID.MAINNET]: ['uniswap', 'uniswap_stoplimit'],
    [CHAIN_ID.ROPSTEN]: ['uniswap', 'quickswap_stoplimit'],
    [CHAIN_ID.MATIC]: ['quickswap', 'polydex', 'cafeswap', 'mmfinance', 'quickswap_stoplimit'],
    [CHAIN_ID.FANTOM]: [
        'spiritswap',
        'spookyswap',
        'bombswap',
        'defyswap',
        'tombswap',
        'protofi',
        'spiritswap_stoplimit',
        'spookyswap_stoplimit',
    ],
    [CHAIN_ID.BSC]: ['pancakeswap', 'pancakeswap_stoplimit'],
    [CHAIN_ID.AVAX]: ['traderjoe', 'pangolin', 'pangolin_stoplimit', 'traderjoe_stoplimit'],
    [CHAIN_ID.CRONOS]: ['vvsfinance', 'mmfinance'],
};
export const isValidChainIdAndHandler = (chainId, handler) => {
    return NETWORK_HANDLERS[chainId].includes(handler);
};
export const isFlashbotsCompatibleChainId = (chainId) => {
    return chainId == CHAIN_ID.MAINNET || chainId == CHAIN_ID.GOERLI;
};
export const isOpenMevCompatibleChainId = (chainId) => {
    return chainId == CHAIN_ID.MAINNET || chainId == CHAIN_ID.GOERLI || chainId == CHAIN_ID.AVAX;
};
//# sourceMappingURL=index.js.map