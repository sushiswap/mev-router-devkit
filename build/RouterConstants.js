import { BigNumber } from 'ethers';
const { JSBI } = await import('JSBI');
export const UNISWAPV2_FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
export const UNISWAPV2_INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f';
export const MINIMUM_LIQUIDITY = BigInt(1000);
export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);
export const FIVE = JSBI.BigInt(5);
export const _997 = JSBI.BigInt(997);
export const _1000 = JSBI.BigInt(1000);
export const DEFAULT_SETTINGS = {
    gasPriceMultiplier: 1050,
    gasLimitOverpay: 20000,
    submitDeadline: 24 * 60 * 60,
};
export const SETTINGS_DENOMINATORS = {
    gasPriceMultiplier: 1000,
    slippageTolerance: 1000,
    depositSlippageTolerance: 1000,
};
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
export const EXECUTE_DEPOSIT_GAS_LIMIT = 630000;
export const EXECUTE_BUY_GAS_LIMIT = 480000;
export const EXECUTE_SELL_GAS_LIMIT = 480000;
export const EXECUTE_WITHDRAW_GAS_LIMIT = 380000;
export const BN_10_18 = BigNumber.from(10).pow(18);
export const BN_ZERO = BigNumber.from(0);
export const BN_ONE = BN_10_18;
export const BN_TWO = BigNumber.from(2).mul(BN_10_18);
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
export const MULTICALL_ADDRESS = {
    [ChainId.Mainnet]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    [ChainId.Ganache]: '0xBCa5c1cBc034C0AF31D976a4e3a36951A537eD77',
};
export const FACTORY_ADDRESS = {
    [ChainId.Mainnet]: '0xC480b33eE5229DE3FbDFAD1D2DCD3F3BAD0C56c6',
    [ChainId.Ganache]: '0xD756fb6A081CC11e7F513C39399DB296b1DE3036',
};
export const READER_ADDRESS = {
    [ChainId.Mainnet]: '0xB5C08263c1D2c9651Ea6d91A9908460e40095f7c',
    [ChainId.Goerli]: '0x1CD25C41Ff4BB6d3dcC147d8f9d1a64dde70b2e6',
    [ChainId.Ganache]: '0x0b156472D34e81765E0B2D440188f248bf2D0382',
};
export const DELAY_ADDRESS = {
    [ChainId.Mainnet]: '0x77B1E5D58247bC3300A8e646b018fceBfeE5a59c',
    [ChainId.Goerli]: '0x5236515d137eAC385F58C945Ec82371dcdb88c84',
    [ChainId.Ganache]: '0x84e924C5E04438D2c1Df1A981f7E7104952e6de1',
};
export const SUSHIGUARD_ROUTERV01_ADDRESS = {
    [ChainId.Mainnet]: '',
    [ChainId.Goerli]: '',
    [ChainId.Ganache]: '',
};
export const WBTC = {
    [ChainId.Mainnet]: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    [ChainId.Ganache]: '',
};
export const USDC = {
    [ChainId.Mainnet]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    [ChainId.Goerli]: '0xb922e0b5C8fFA89Fe6195a581acC7D292B924142',
    [ChainId.Ganache]: '0xFDFEF9D10d929cB3905C71400ce6be1990EA0F34',
};
export const USDT = {
    [ChainId.Mainnet]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    [ChainId.Ganache]: '0xaC8444e7d45c34110B34Ed269AD86248884E78C7',
};
export const DAI = {
    [ChainId.Mainnet]: '0x6b175474e89094c44da98b954eedeac495271d0f',
    [ChainId.Ganache]: '0x94BA4d5Ebb0e05A50e977FFbF6e1a1Ee3D89299c',
};
export const WETH = {
    [ChainId.Mainnet]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    [ChainId.Ganache]: '',
};
export const LINK = {
    [ChainId.Mainnet]: '0x514910771af9ca656af840dff83e8264ecf986ca',
    [ChainId.Ganache]: '',
};
export const CRV = {
    [ChainId.Mainnet]: '0xD533a949740bb3306d119CC777fa900bA034cd52',
    [ChainId.Ganache]: '',
};
export const CVX = {
    [ChainId.Mainnet]: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
    [ChainId.Ganache]: '',
};
export const SUSHI = {
    [ChainId.Mainnet]: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
    [ChainId.Ganache]: '',
};
export const WETH_USDC = {
    [ChainId.Mainnet]: '0x2fe16Dd18bba26e457B7dD2080d5674312b026a2',
    [ChainId.Ganache]: '',
};
export const WETH_CVX = {
    [ChainId.Mainnet]: '0x43f0E5f2304F261DfA5359a0b74Ff030E498D904',
    [ChainId.Ganache]: '',
};
export const WETH_SUSHI = {
    [ChainId.Mainnet]: '0xD66f214fB49f81Ac5610e0339A351D7e1c67c35e',
    [ChainId.Ganache]: '',
};
export const ERC20_ABI = [
    'constructor(uint256 _totalSupply)',
    'event Approval(address indexed owner, address indexed spender, uint256 value)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
    'function DOMAIN_SEPARATOR() view returns(bytes32)',
    'function PERMIT_TYPEHASH() view returns(bytes32)',
    'function allowance(address, address) view returns(uint256)',
    'function approve(address spender, uint256 value) returns(bool)',
    'function balanceOf(address) view returns(uint256)',
    'function decimals() view returns(uint8)',
    'function name() view returns(string)',
    'function nonces(address) view returns(uint256)',
    'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
    'function symbol() view returns(string)',
    'function totalSupply() view returns(uint256)',
    'function transfer(address to, uint256 value) returns(bool)',
    'function transferFrom(address from, address to, uint256 value) returns(bool)',
];
export const PAIR_ABI = [
    'function oracle() external view returns (address)',
    'function token0() external view returns (address)',
    'function token1() external view returns (address)',
];
export const ORACLE_ABI = [
    'function uniswapPair() view returns(address)',
    'function xDecimals() external view returns (uint8)',
    'function yDecimals() external view returns (uint8)',
];
export const UNISWAP_V2_PAIR_ABI = [
    'function getReserves() view returns(uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)',
];
export const UNISWAP_V3_POOL_ABI = [
    'function slot0() view returns(uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)',
];
export const READER_ABI = [
    'function getPairParameters(address pairAddress) view returns(bool exists, uint112 reserve0, uint112 reserve1, uint256 price, uint256 mintFee, uint256 burnFee, uint256 swapFee)',
];
export const FACTORY_ABI = [
    'function getPair(address tokenA, address tokenB) view returns(address pair)',
    'function allPairsLength() view returns(uint256)',
    'function allPairs(uint256) external view returns (address pair)',
];
export const MULTICALL_ABI = [
    'function aggregate(tuple(address target, bytes callData)[] calls) view returns (uint256 blockNumber, bytes[] returnData)',
    'function getEthBalance(address addr) view returns (uint256 balance)',
    'function getBlockHash(uint256 blockNumber) view returns (bytes32 blockHash)',
    'function getLastBlockHash() view returns (bytes32 blockHash)',
    'function getCurrentBlockTimestamp() view returns (uint256 timestamp)',
    'function getCurrentBlockDifficulty() view returns (uint256 difficulty)',
    'function getCurrentBlockGasLimit() view returns (uint256 gaslimit)',
    'function getCurrentBlockCoinbase() view returns (address coinbase)',
];
//# sourceMappingURL=RouterConstants.js.map