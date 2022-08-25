import { ChainId } from '../constants';

export class Currency {
  constructor(
    readonly chainId: ChainId,
    readonly name: string,
    readonly symbol: string,
    readonly decimals: number,
  ) {}
}
