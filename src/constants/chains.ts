export enum ChainId {
  Mainnet = 1,
  Goerli = 5,
  Ganache = 1337,
}

export const CHAIN_ID_NAMES = {
  [ChainId.Mainnet]: 'Mainnet',
  [ChainId.Goerli]: 'Goerli',
  [ChainId.Ganache]: 'Ganache',
};
