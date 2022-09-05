export var ChainId;
(function (ChainId) {
    ChainId[ChainId["Mainnet"] = 1] = "Mainnet";
    ChainId[ChainId["Goerli"] = 5] = "Goerli";
    ChainId[ChainId["Ganache"] = 1337] = "Ganache";
})(ChainId || (ChainId = {}));
export const CHAIN_ID_NAMES = {
    [ChainId.Mainnet]: 'Mainnet',
    [ChainId.Goerli]: 'Goerli',
    [ChainId.Ganache]: 'Ganache',
};
//# sourceMappingURL=chains.js.map