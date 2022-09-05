import { BigNumber } from 'ethers';
export declare class Oracle {
    xDecimals: number;
    yDecimals: number;
    price: BigNumber;
    private decimalsConverter;
    constructor(xDecimals: number, yDecimals: number, price: BigNumber);
    tradeX(xAfter: BigNumber, xBefore: BigNumber, yBefore: BigNumber): BigNumber;
    tradeY(yAfter: BigNumber, xBefore: BigNumber, yBefore: BigNumber): BigNumber;
    depositTradeXIn(xLeft: BigNumber, xBefore: BigNumber, yBefore: BigNumber): BigNumber;
    depositTradeYIn(yLeft: BigNumber, xBefore: BigNumber, yBefore: BigNumber): BigNumber;
}
