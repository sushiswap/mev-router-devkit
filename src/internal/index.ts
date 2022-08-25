import { BytesLike } from '@ethersproject/bytes/lib.esm/index.js';
import { BigNumberish } from '@ethersproject/bignumber/lib.esm/index.js';

// mainnet | ropsten | goerli | cronos | bsc | matic | fantom | avalanche
export type ChainId = 1 | 3 | 5 | 25 | 56 | 137 | 250 | 43114;

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

export type Handler =
  | 'spookyswap'
  | 'spookyswap_stoplimit'
  | 'uniswap'
  | 'uniswap_stoplimit'
  | 'quickswap'
  | 'quickswap_stoplimit'
  | 'spiritswap'
  | 'spiritswap_stoplimit'
  | 'bombswap'
  | 'polydex'
  | 'cafeswap'
  | 'pancakeswap'
  | 'pancakeswap_stoplimit'
  | 'traderjoe'
  | 'traderjoe_stoplimit'
  | 'defyswap'
  | 'pangolin'
  | 'pangolin_stoplimit'
  | 'tombswap'
  | 'vvsfinance'
  | 'mmfinance'
  | 'protofi';

export interface TransactionData {
  to: string;
  data: BytesLike;
  value: BigNumberish;
}

export interface TransactionDataWithSecret {
  payload: TransactionData;
  secret: string;
  witness: string;
  order: PartialOrder | PartialStopLimitOrder;
}

export interface WitnessAndSecret {
  witness: string;
  secret: string;
}

export interface Order {
  id: string;
  owner: string;
  inputToken: string;
  outputToken: string;
  minReturn: string;
  maxReturn?: string;
  adjustedMinReturn: string;
  module: string;
  witness: string;
  secret: string;
  inputAmount: string;
  vault: string;
  bought: string | null;
  auxData: string | null;
  status: string;
  createdTxHash: string;
  executedTxHash: string | null;
  cancelledTxHash: string | null;
  blockNumber: string;
  createdAt: string;
  updatedAt: string;
  updatedAtBlock: string;
  updatedAtBlockHash: string;
  data: string;
  inputData: string;
  handler: string | null;
  isExpired: boolean;
}

export interface StopLimitOrder extends Order {
  maxReturn: string;
}
export interface PartialOrder {
  id: string;
  owner: string;
  inputToken: string;
  outputToken: string;
  minReturn: string;
  adjustedMinReturn: string;
  module: string;
  witness: string;
  secret: string;
  inputAmount: string;
  data: string;
  inputData: string;
  handler: string | null;
}

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

export interface PartialStopLimitOrder extends PartialOrder {
  maxReturn: string;
}

export const isValidChainIdAndHandler = (chainId: ChainId, handler: Handler): boolean => {
  return NETWORK_HANDLERS[chainId].includes(handler);
};

export const isFlashbotsCompatibleChainId = (chainId: ChainId): boolean => {
  return chainId == CHAIN_ID.MAINNET || chainId == CHAIN_ID.GOERLI;
};

export const isOpenMevCompatibleChainId = (chainId: ChainId): boolean => {
  return chainId == CHAIN_ID.MAINNET || chainId == CHAIN_ID.GOERLI || chainId == CHAIN_ID.AVAX;
};
