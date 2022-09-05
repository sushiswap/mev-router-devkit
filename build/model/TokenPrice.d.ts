import { BigNumber } from 'ethers';
export interface TokenPrice {
    symbol: string;
    address: string;
    price: BigNumber;
}
