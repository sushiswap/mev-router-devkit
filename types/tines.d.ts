import { BigNumber } from '@ethersproject/bignumber/lib.esm/index.js';

declare const TYPICAL_SWAP_GAS_COST = 60000;
declare const TYPICAL_MINIMAL_LIQUIDITY = 1000;
interface RToken {
    name: string;
    symbol: string;
    address: string;
}
declare abstract class RPool {
    readonly address: string;
    readonly token0: RToken;
    readonly token1: RToken;
    readonly fee: number;
    reserve0: BigNumber;
    reserve1: BigNumber;
    readonly minLiquidity: number;
    readonly swapGasCost: number;
    constructor(address: string, token0: RToken, token1: RToken, fee: number, reserve0: BigNumber, reserve1: BigNumber, minLiquidity?: number, swapGasCost?: number);
    updateReserves(res0: BigNumber, res1: BigNumber): void;
    getReserve0(): BigNumber;
    getReserve1(): BigNumber;
    abstract calcOutByIn(amountIn: number, direction: boolean): {
        out: number;
        gasSpent: number;
    };
    abstract calcInByOut(amountOut: number, direction: boolean): {
        inp: number;
        gasSpent: number;
    };
    abstract calcCurrentPriceWithoutFee(direction: boolean): number;
    granularity0(): number;
    granularity1(): number;
}
declare class ConstantProductRPool extends RPool {
    reserve0Number: number;
    reserve1Number: number;
    constructor(address: string, token0: RToken, token1: RToken, fee: number, reserve0: BigNumber, reserve1: BigNumber);
    updateReserves(res0: BigNumber, res1: BigNumber): void;
    calcOutByIn(amountIn: number, direction: boolean): {
        out: number;
        gasSpent: number;
    };
    calcInByOut(amountOut: number, direction: boolean): {
        inp: number;
        gasSpent: number;
    };
    calcCurrentPriceWithoutFee(direction: boolean): number;
    calcPrice(amountIn: number, direction: boolean, takeFeeIntoAccount: boolean): number;
    calcInputByPrice(price: number, direction: boolean, takeFeeIntoAccount: boolean): number;
    getLiquidity(): number;
}
declare class HybridRPool extends RPool {
    readonly A: number;
    readonly A_PRECISION = 100;
    D: BigNumber;
    constructor(address: string, token0: RToken, token1: RToken, fee: number, A: number, reserve0: BigNumber, reserve1: BigNumber);
    updateReserves(res0: BigNumber, res1: BigNumber): void;
    computeLiquidity(): BigNumber;
    computeY(x: BigNumber): BigNumber;
    calcOutByIn(amountIn: number, direction: boolean): {
        out: number;
        gasSpent: number;
    };
    calcInByOut(amountOut: number, direction: boolean): {
        inp: number;
        gasSpent: number;
    };
    calcCurrentPriceWithoutFee(direction: boolean): number;
    calcPrice(amountIn: number, direction: boolean, takeFeeIntoAccount: boolean): number;
    calcInputByPrice(price: number, direction: boolean, takeFeeIntoAccount: boolean, hint?: number): number;
}

declare const CL_MIN_TICK = -887272;
declare const CL_MAX_TICK: number;
interface CLTick {
    index: number;
    DLiquidity: number;
}
declare class CLRPool extends RPool {
    tickSpacing: number;
    liquidity: number;
    sqrtPrice: number;
    nearestTick: number;
    ticks: CLTick[];
    constructor(address: string, token0: RToken, token1: RToken, fee: number, tickSpacing: number, reserve0: BigNumber, reserve1: BigNumber, liquidity: number, sqrtPrice: number, nearestTick: number, ticks: CLTick[]);
    calcOutByIn(amountIn: number, direction: boolean): {
        out: number;
        gasSpent: number;
    };
    calcInByOut(amountOut: number, direction: boolean): {
        inp: number;
        gasSpent: number;
    };
    calcCurrentPriceWithoutFee(direction: boolean): number;
}

interface RouteLeg {
    poolAddress: string;
    poolFee: number;
    tokenFrom: RToken;
    tokenTo: RToken;
    assumedAmountIn: number;
    assumedAmountOut: number;
    swapPortion: number;
    absolutePortion: number;
}
declare enum RouteStatus {
    Success = "Success",
    NoWay = "NoWay",
    Partial = "Partial"
}
interface MultiRoute {
    status: RouteStatus;
    fromToken: RToken;
    toToken: RToken;
    primaryPrice?: number;
    swapPrice?: number;
    priceImpact?: number;
    amountIn: number;
    amountInBN: BigNumber;
    amountOut: number;
    amountOutBN: BigNumber;
    legs: RouteLeg[];
    gasSpent: number;
    totalAmountOut: number;
    totalAmountOutBN: BigNumber;
}
declare class Edge {
    pool: RPool;
    vert0: Vertice;
    vert1: Vertice;
    canBeUsed: boolean;
    direction: boolean;
    amountInPrevious: number;
    amountOutPrevious: number;
    spentGas: number;
    spentGasNew: number;
    bestEdgeIncome: number;
    constructor(p: RPool, v0: Vertice, v1: Vertice);
    cleanTmpData(): void;
    reserve(v: Vertice): BigNumber;
    calcOutput(v: Vertice, amountIn: number): {
        out: number;
        gasSpent: number;
    };
    calcInput(v: Vertice, amountOut: number): {
        inp: number;
        gasSpent: number;
    };
    checkMinimalLiquidityExceededAfterSwap(from: Vertice, amountOut: number): boolean;
    testApply(from: Vertice, amountIn: number, amountOut: number): boolean;
    applySwap(from: Vertice): void;
}
declare class Vertice {
    token: RToken;
    edges: Edge[];
    price: number;
    gasPrice: number;
    bestIncome: number;
    gasSpent: number;
    bestTotal: number;
    bestSource?: Edge;
    checkLine: number;
    constructor(t: RToken);
    cleanTmpData(): void;
    getNeighbor(e?: Edge): Vertice;
    getOutputEdges(): Edge[];
    getInputEdges(): Edge[];
}
declare class Graph {
    vertices: Vertice[];
    edges: Edge[];
    tokens: Map<string, Vertice>;
    constructor(pools: RPool[], baseToken: RToken, gasPrice: number);
    cleanTmpData(): void;
    setPricesStable(from: Vertice, price: number, gasPrice: number): void;
    setPrices(from: Vertice, price: number, gasPrice: number): void;
    getOrCreateVertice(token: RToken): Vertice;
    findBestPathExactIn(from: RToken, to: RToken, amountIn: number, _gasPrice?: number): {
        path: Edge[];
        output: number;
        gasSpent: number;
        totalOutput: number;
    } | undefined;
    findBestPathExactOut(from: RToken, to: RToken, amountOut: number, _gasPrice?: number): {
        path: Edge[];
        input: number;
        gasSpent: number;
        totalInput: number;
    } | undefined;
    addPath(from: Vertice | undefined, to: Vertice | undefined, path: Edge[]): void;
    getPrimaryPriceForPath(from: Vertice, path: Edge[]): number;
    findBestRouteExactIn(from: RToken, to: RToken, amountIn: BigNumber | number, mode: number | number[]): MultiRoute;
    findBestRouteExactOut(from: RToken, to: RToken, amountOut: number, mode: number | number[]): MultiRoute;
    getRouteLegs(from: Vertice, to: Vertice): {
        legs: RouteLeg[];
        gasSpent: number;
        topologyWasChanged: boolean;
    };
    edgeFrom(e: Edge): {
        vert: Vertice;
        amount: number;
    } | undefined;
    calcLegsAmountOut(legs: RouteLeg[], amountIn: number): number;
    calcLegsAmountIn(legs: RouteLeg[], amountOut: number): number;
    cleanTopology(from: Vertice, to: Vertice): {
        vertices: Vertice[];
        topologyWasChanged: boolean;
    };
    removeDeadEnds(verts: Vertice[]): void;
    removeWeakestEdge(verts: Vertice[]): void;
    topologySort(from: Vertice, to: Vertice): {
        status: number;
        vertices: Vertice[];
    };
}

declare function findMultiRouteExactIn(from: RToken, to: RToken, amountIn: BigNumber | number, pools: RPool[], baseToken: RToken, gasPrice: number, flows?: number | number[]): MultiRoute;
declare function findMultiRouteExactOut(from: RToken, to: RToken, amountOut: BigNumber | number, pools: RPool[], baseToken: RToken, gasPrice: number, flows?: number | number[]): MultiRoute;
declare function findSingleRouteExactIn(from: RToken, to: RToken, amountIn: BigNumber | number, pools: RPool[], baseToken: RToken, gasPrice: number): MultiRoute;
declare function findSingleRouteExactOut(from: RToken, to: RToken, amountOut: BigNumber | number, pools: RPool[], baseToken: RToken, gasPrice: number): MultiRoute;
declare function calcTokenPrices(pools: RPool[], baseToken: RToken): Map<RToken, number>;

interface JumpInfo {
    poolIndex: number;
    input: number;
    output: number;
    price: number;
    combinedLiquidityY: number;
    gasCost: number;
}
declare class ParallelCPRPool extends RPool {
    readonly token0: RToken;
    readonly allPools: ConstantProductRPool[];
    readonly gasPrice: number;
    jumps0?: JumpInfo[];
    jumps1?: JumpInfo[];
    constructor(inputToken: RToken, pools: ConstantProductRPool[], gasPrice: number);
    calcNextJumpforPool(pool: ConstantProductRPool, poolIndex: number, direction: boolean, prevJump?: JumpInfo): JumpInfo | undefined;
    calcBestJump(pools: ConstantProductRPool[], direction: boolean, prevJump?: JumpInfo): JumpInfo | undefined;
    calcJumps(direction: boolean): JumpInfo[];
    getJump(direction: boolean, less: (j: JumpInfo) => boolean): JumpInfo;
    calcOutByIn(amountIn: number, direction: boolean): {
        out: number;
        gasSpent: number;
    };
    calcInByOut(amountOut: number, direction: boolean): {
        inp: number;
        gasSpent: number;
    };
    calcCurrentPriceWithoutFee(direction: boolean): number;
}

declare class Pool {
    from: number;
    to: number;
    edge: Edge;
    direction: boolean;
    constructor(fromIndex: number, toIndex: number, edge: Edge, from: Vertice);
    calcOutByIn(amountIn: number): number;
    input(): number;
}
declare class Redistributor {
    tokenNumber: number;
    tokensTopologySorted: Vertice[];
    tokenIndex: Map<Vertice, number>;
    outputTokens: number[][];
    pools: Pool[][];
    paths: Pool[][];
    getPaths(from: number, to: number): Pool[] | undefined;
    setPaths(from: number, to: number, paths: Pool[]): void;
    getPools(from: number, to: number): Pool[] | undefined;
    setPools(from: number, to: number, pools: Pool[]): void;
    constructor(_nodesTopologySorted: Vertice[]);
    redistribute(): void;
    redistrPaths(from: number, to: number, paths: Pool[]): void;
    calcOutput(from: number, to: number, paths: Pool[], amountIn: number): number;
    calcPrice(from: number, to: number, paths: Pool[], amountIn: number): number;
    calcInputForPrice(from: number, to: number, paths: Pool[], amountIn: number, price: number): number;
}

interface Rebase {
    elastic: BigNumber;
    base: BigNumber;
}
declare class RebaseInternal {
    elastic2Base: number;
    rebaseBN: Rebase;
    constructor(rebase: Rebase);
    toAmount(share: number): number;
    toShare(amount: number): number;
    toAmountBN(share: BigNumber): BigNumber;
}
declare function realReservesToAdjusted(reserve: BigNumber, total: Rebase, decimals: number): BigNumber;
declare function adjustedReservesToReal(reserve: BigNumber, total: Rebase, decimals: number): BigNumber;
declare class StableSwapRPool extends RPool {
    k: BigNumber;
    decimals0: number;
    decimals1: number;
    decimalsCompensation0: number;
    decimalsCompensation1: number;
    total0: RebaseInternal;
    total1: RebaseInternal;
    constructor(address: string, token0: RToken, token1: RToken, fee: number, reserve0: BigNumber, reserve1: BigNumber, decimals0: number, decimals1: number, total0: Rebase, total1: Rebase);
    getReserve0(): BigNumber;
    getReserve1(): BigNumber;
    granularity0(): number;
    granularity1(): number;
    updateReserves(res0: BigNumber, res1: BigNumber): void;
    computeK(): BigNumber;
    computeY(x: BigNumber, yHint: BigNumber): BigNumber;
    calcOutByIn(amountIn: number, direction: boolean): {
        out: number;
        gasSpent: number;
    };
    calcInByOut(amountOut: number, direction: boolean): {
        inp: number;
        gasSpent: number;
    };
    calcCurrentPriceWithoutFee(direction: boolean): number;
}

declare function ASSERT(f: () => boolean, t?: string): void;
declare function DEBUG(f: () => unknown): void;
declare function DEBUG_MODE_ON(on: boolean): void;
declare function closeValues(a: number, b: number, accuracy: number, logInfoIfFalse?: string): boolean;
declare function calcSquareEquation(a: number, b: number, c: number): [number, number];
declare function revertPositive(f: (x: number) => number, out: number, hint?: number): number;
declare function getBigNumber(value: number): BigNumber;

export { ASSERT, CLRPool, CLTick, CL_MAX_TICK, CL_MIN_TICK, ConstantProductRPool, DEBUG, DEBUG_MODE_ON, Edge, Graph, HybridRPool, MultiRoute, ParallelCPRPool, RPool, RToken, Rebase, Redistributor, RouteLeg, RouteStatus, StableSwapRPool, TYPICAL_MINIMAL_LIQUIDITY, TYPICAL_SWAP_GAS_COST, Vertice, adjustedReservesToReal, calcSquareEquation, calcTokenPrices, closeValues, findMultiRouteExactIn, findMultiRouteExactOut, findSingleRouteExactIn, findSingleRouteExactOut, getBigNumber, realReservesToAdjusted, revertPositive };
