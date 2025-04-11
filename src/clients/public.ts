import type { IRequestTransport } from "../base";
import type { BlockDetailsRequest, TxDetailsRequest, UserDetailsRequest } from "../types/explorer/requests";
import type { BlockDetailsResponse, TxDetailsResponse, UserDetailsResponse } from "../types/explorer/responses";
import type {
    ExtraAgent,
    LegalCheck,
    MultiSigSigners,
    PerpsClearinghouseState,
    PortfolioPeriods,
    PreTransferCheck,
    Referral,
    SpotClearinghouseState,
    SubAccount,
    UserFees,
    UserFundingUpdate,
    UserNonFundingLedgerUpdate,
    UserRateLimit,
    UserRole,
} from "../types/info/accounts";
import type {
    AllMids,
    Candle,
    FundingHistory,
    PerpsMeta,
    PerpsMetaAndAssetCtxs,
    PredictedFunding,
    SpotDeployState,
    SpotMeta,
    SpotMetaAndAssetCtxs,
    TokenDetails,
} from "../types/info/assets";
import type {
    Delegation,
    DelegatorReward,
    DelegatorSummary,
    DelegatorUpdate,
    ValidatorSummary,
} from "../types/info/delegations";
import type {
    Book,
    Fill,
    FrontendOrder,
    Order,
    OrderLookup,
    OrderStatus,
    TwapHistory,
    TwapSliceFill,
} from "../types/info/orders";
import type {
    AllMidsRequest,
    CandleSnapshotRequest,
    ClearinghouseStateRequest,
    DelegationsRequest,
    DelegatorHistoryRequest,
    DelegatorRewardsRequest,
    DelegatorSummaryRequest,
    ExtraAgentsRequest,
    FrontendOpenOrdersRequest,
    FundingHistoryRequest,
    HistoricalOrdersRequest,
    IsVipRequest,
    L2BookRequest,
    LegalCheckRequest,
    MaxBuilderFeeRequest,
    MetaAndAssetCtxsRequest,
    MetaRequest,
    OpenOrdersRequest,
    OrderStatusRequest,
    PerpsAtOpenInterestCapRequest,
    PortfolioRequest,
    PredictedFundingsRequest,
    PreTransferCheckRequest,
    ReferralRequest,
    SpotClearinghouseStateRequest,
    SpotDeployStateRequest,
    SpotMetaAndAssetCtxsRequest,
    SpotMetaRequest,
    SubAccountsRequest,
    TokenDetailsRequest,
    TwapHistoryRequest,
    UserFeesRequest,
    UserFillsByTimeRequest,
    UserFillsRequest,
    UserFundingRequest,
    UserNonFundingLedgerUpdatesRequest,
    UserRateLimitRequest,
    UserRoleRequest,
    UserToMultiSigSignersRequest,
    UserTwapSliceFillsByTimeRequest,
    UserTwapSliceFillsRequest,
    UserVaultEquitiesRequest,
    ValidatorSummariesRequest,
    VaultDetailsRequest,
    VaultSummariesRequest,
} from "../types/info/requests";
import type { VaultDetails, VaultEquity, VaultSummary } from "../types/info/vaults";

/** Parameters for the {@linkcode PublicClient} constructor. */
export interface PublicClientParameters<T extends IRequestTransport = IRequestTransport> {
    /** The transport used to connect to the Hyperliquid API. */
    transport: T;
}

/** Parameters for the {@linkcode PublicClient.candleSnapshot} method. */
export type CandleSnapshotParameters = CandleSnapshotRequest["req"];

/** Parameters for the {@linkcode PublicClient.clearinghouseState} method. */
export type ClearinghouseStateParameters = Omit<ClearinghouseStateRequest, "type">;

/** Parameters for the {@linkcode PublicClient.delegations} method. */
export type DelegationsParameters = Omit<DelegationsRequest, "type">;

/** Parameters for the {@linkcode PublicClient.delegatorHistory} method. */
export type DelegatorHistoryParameters = Omit<DelegatorHistoryRequest, "type">;

/** Parameters for the {@linkcode PublicClient.delegatorRewards} method. */
export type DelegatorRewardsParameters = Omit<DelegatorRewardsRequest, "type">;

/** Parameters for the {@linkcode PublicClient.delegatorSummary} method. */
export type DelegatorSummaryParameters = Omit<DelegatorSummaryRequest, "type">;

/** Parameters for the {@linkcode PublicClient.extraAgents} method. */
export type ExtraAgentsParameters = Omit<ExtraAgentsRequest, "type">;

/** Parameters for the {@linkcode PublicClient.frontendOpenOrders} method. */
export type FrontendOpenOrdersParameters = Omit<FrontendOpenOrdersRequest, "type">;

/** Parameters for the {@linkcode PublicClient.fundingHistory} method. */
export type FundingHistoryParameters = Omit<FundingHistoryRequest, "type">;

/** Parameters for the {@linkcode PublicClient.historicalOrders} method. */
export type HistoricalOrdersParameters = Omit<HistoricalOrdersRequest, "type">;

/** Parameters for the {@linkcode PublicClient.isVip} method. */
export type IsVipParameters = Omit<IsVipRequest, "type">;

/** Parameters for the {@linkcode PublicClient.l2Book} method. */
export type L2BookParameters = Omit<L2BookRequest, "type">;

/** Parameters for the {@linkcode PublicClient.legalCheck} method. */
export type LegalCheckParameters = Omit<LegalCheckRequest, "type">;

/** Parameters for the {@linkcode PublicClient.maxBuilderFee} method. */
export type MaxBuilderFeeParameters = Omit<MaxBuilderFeeRequest, "type">;

/** Parameters for the {@linkcode PublicClient.openOrders} method. */
export type OpenOrdersParameters = Omit<OpenOrdersRequest, "type">;

/** Parameters for the {@linkcode PublicClient.orderStatus} method. */
export type OrderStatusParameters = Omit<OrderStatusRequest, "type">;

/** Parameters for the {@linkcode PublicClient.portfolio} method. */
export type PortfolioParameters = Omit<PortfolioRequest, "type">;

/** Parameters for the {@linkcode PublicClient.preTransferCheck} method. */
export type PreTransferCheckParameters = Omit<PreTransferCheckRequest, "type">;

/** Parameters for the {@linkcode PublicClient.referral} method. */
export type ReferralParameters = Omit<ReferralRequest, "type">;

/** Parameters for the {@linkcode PublicClient.spotClearinghouseState} method. */
export type SpotClearinghouseStateParameters = Omit<SpotClearinghouseStateRequest, "type">;

/** Parameters for the {@linkcode PublicClient.spotDeployState} method. */
export type SpotDeployStateParameters = Omit<SpotDeployStateRequest, "type">;

/** Parameters for the {@linkcode PublicClient.subAccounts} method. */
export type SubAccountsParameters = Omit<SubAccountsRequest, "type">;

/** Parameters for the {@linkcode PublicClient.tokenDetails} method. */
export type TokenDetailsParameters = Omit<TokenDetailsRequest, "type">;

/** Parameters for the {@linkcode PublicClient.twapHistory} method. */
export type TwapHistoryParameters = Omit<TwapHistoryRequest, "type">;

/** Parameters for the {@linkcode PublicClient.userFees} method. */
export type UserFeesParameters = Omit<UserFeesRequest, "type">;

/** Parameters for the {@linkcode PublicClient.userFills} method. */
export type UserFillsParameters = Omit<UserFillsRequest, "type">;

/** Parameters for the {@linkcode PublicClient.userFillsByTime} method. */
export type UserFillsByTimeParameters = Omit<UserFillsByTimeRequest, "type">;

/** Parameters for the {@linkcode PublicClient.userFunding} method. */
export type UserFundingParameters = Omit<UserFundingRequest, "type">;

/** Parameters for the {@linkcode PublicClient.userNonFundingLedgerUpdates} method. */
export type UserNonFundingLedgerUpdatesParameters = Omit<UserNonFundingLedgerUpdatesRequest, "type">;

/** Parameters for the {@linkcode PublicClient.userRateLimit} method. */
export type UserRateLimitParameters = Omit<UserRateLimitRequest, "type">;

/** Parameters for the {@linkcode PublicClient.userRole} method. */
export type UserRoleParameters = Omit<UserRoleRequest, "type">;

/** Parameters for the {@linkcode PublicClient.userToMultiSigSigners} method. */
export type UserToMultiSigSignersParameters = Omit<UserToMultiSigSignersRequest, "type">;

/** Parameters for the {@linkcode PublicClient.userTwapSliceFills} method. */
export type UserTwapSliceFillsParameters = Omit<UserTwapSliceFillsRequest, "type">;

/** Parameters for the {@linkcode PublicClient.userTwapSliceFillsByTime} method. */
export type UserTwapSliceFillsByTimeParameters = Omit<UserTwapSliceFillsByTimeRequest, "type">;

/** Parameters for the {@linkcode PublicClient.userVaultEquities} method. */
export type UserVaultEquitiesParameters = Omit<UserVaultEquitiesRequest, "type">;

/** Parameters for the {@linkcode PublicClient.vaultDetails} method. */
export type VaultDetailsParameters = Omit<VaultDetailsRequest, "type">;

/** Parameters for the {@linkcode PublicClient.blockDetails} method. */
export type BlockDetailsParameters = Omit<BlockDetailsRequest, "type">;

/** Parameters for the {@linkcode PublicClient.txDetails} method. */
export type TxDetailsParameters = Omit<TxDetailsRequest, "type">;

/** Parameters for the {@linkcode PublicClient.userDetails} method. */
export type UserDetailsParameters = Omit<UserDetailsRequest, "type">;

/**
 * Public client for interacting with the Hyperliquid API.
 * @typeParam T The type of transport used to connect to the Hyperliquid API.
 */
export class PublicClient<T extends IRequestTransport = IRequestTransport> {
    /** The transport used to connect to the Hyperliquid API. */
    transport: T;

    /**
     * Initialises a new instance.
     * @param args - The arguments for initialisation.
     *
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     * ```
     */
    constructor(args: PublicClientParameters<T>) {
        this.transport = args.transport;
    }

    /**
     * Request mid coin prices.
     * @param signal - An optional abort signal.
     * @returns Mid coin prices.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-mids-for-all-coins
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const allMids = await client.allMids();
     * ```
     */
    allMids(signal?: AbortSignal): Promise<AllMids> {
        const request: AllMidsRequest = {
            type: "allMids",
        };
        return this.transport.request("info", request, signal) as Promise<AllMids>;
    }

    /**
     * Block details by block height.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Block details response.
     *
     * @see null - no documentation
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const { blockDetails } = await client.blockDetails({ height: 123 });
     * ```
     */
    blockDetails(args: BlockDetailsParameters, signal?: AbortSignal): Promise<BlockDetailsResponse> {
        const request: BlockDetailsRequest = {
            type: "blockDetails",
            ...args,
        };
        return this.transport.request("explorer", request, signal) as Promise<BlockDetailsResponse>;
    }

    /**
     * Request candlestick snapshots.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of candlestick data points.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#candle-snapshot
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const candleSnapshot = await client.candleSnapshot({
     *   coin: "ETH",
     *   interval: "1h",
     *   startTime: Date.now() - 1000 * 60 * 60 * 24
     * });
     * ```
     */
    candleSnapshot(args: CandleSnapshotParameters, signal?: AbortSignal): Promise<Candle[]> {
        const request: CandleSnapshotRequest = {
            type: "candleSnapshot",
            req: args,
        };
        return this.transport.request("info", request, signal) as Promise<Candle[]>;
    }

    /**
     * Request clearinghouse state.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Account summary for perpetual trading.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-users-perpetuals-account-summary
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const clearinghouseState = await client.clearinghouseState({ user: "0x..." });
     * ```
     */
    clearinghouseState(args: ClearinghouseStateParameters, signal?: AbortSignal): Promise<PerpsClearinghouseState> {
        const request: ClearinghouseStateRequest = {
            type: "clearinghouseState",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<PerpsClearinghouseState>;
    }

    /**
     * Request user staking delegations.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of user's delegations to validators.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#query-a-users-staking-delegations
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const delegations = await client.delegations({ user: "0x..." });
     * ```
     */
    delegations(args: DelegationsParameters, signal?: AbortSignal): Promise<Delegation[]> {
        const request: DelegationsRequest = {
            type: "delegations",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<Delegation[]>;
    }

    /**
     * Request user staking history.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of user's staking updates.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#query-a-users-staking-history
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const delegatorHistory = await client.delegatorHistory({ user: "0x..." });
     * ```
     */
    delegatorHistory(args: DelegatorHistoryParameters, signal?: AbortSignal): Promise<DelegatorUpdate[]> {
        const request: DelegatorHistoryRequest = {
            type: "delegatorHistory",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<DelegatorUpdate[]>;
    }

    /**
     * Request user staking rewards.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of user's staking rewards.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#query-a-users-staking-rewards
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const delegatorRewards = await client.delegatorRewards({ user: "0x..." });
     * ```
     */
    delegatorRewards(args: DelegatorRewardsParameters, signal?: AbortSignal): Promise<DelegatorReward[]> {
        const request: DelegatorRewardsRequest = {
            type: "delegatorRewards",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<DelegatorReward[]>;
    }

    /**
     * Request user staking summary.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Summary of a user's staking delegations.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#query-a-users-staking-summary
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const delegatorSummary = await client.delegatorSummary({ user: "0x..." });
     * ```
     */
    delegatorSummary(args: DelegatorSummaryParameters, signal?: AbortSignal): Promise<DelegatorSummary> {
        const request: DelegatorSummaryRequest = {
            type: "delegatorSummary",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<DelegatorSummary>;
    }

    /**
     * Request user's extra agents.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns User's extra agents.
     *
     * @see null - no documentation
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const extraAgents = await client.extraAgents({ user: "0x..." });
     * ```
     */
    extraAgents(args: ExtraAgentsParameters, signal?: AbortSignal): Promise<ExtraAgent[]> {
        const request: ExtraAgentsRequest = {
            type: "extraAgents",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<ExtraAgent[]>;
    }

    /**
     * Request frontend open orders.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of open orders with additional frontend information.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-a-users-open-orders-with-additional-frontend-info
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const frontendOpenOrders = await client.frontendOpenOrders({ user: "0x..." });
     * ```
     */
    frontendOpenOrders(args: FrontendOpenOrdersParameters, signal?: AbortSignal): Promise<FrontendOrder[]> {
        const request: FrontendOpenOrdersRequest = {
            type: "frontendOpenOrders",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<FrontendOrder[]>;
    }

    /**
     * Request funding history.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of historical funding rate data for an asset.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-historical-funding-rates
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const fundingHistory = await client.fundingHistory({
     *   coin: "ETH",
     *   startTime: Date.now() - 1000 * 60 * 60 * 24
     * });
     * ```
     */
    fundingHistory(args: FundingHistoryParameters, signal?: AbortSignal): Promise<FundingHistory[]> {
        const request: FundingHistoryRequest = {
            type: "fundingHistory",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<FundingHistory[]>;
    }

    /**
     * Request user's historical orders.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of user's historical orders.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-a-users-historical-orders
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const historicalOrders = await client.historicalOrders({ user: "0x..." });
     * ```
     */
    historicalOrders(args: HistoricalOrdersParameters, signal?: AbortSignal): Promise<OrderStatus<FrontendOrder>[]> {
        const request: HistoricalOrdersRequest = {
            type: "historicalOrders",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<OrderStatus<FrontendOrder>[]>;
    }

    /**
     * Request to check if a user is a VIP.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Boolean indicating user's VIP status.
     *
     * @see null - no documentation
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const isVip = await client.isVip({ user: "0x..." });
     * ```
     */
    isVip(args: IsVipParameters, signal?: AbortSignal): Promise<boolean> {
        const request: IsVipRequest = {
            type: "isVip",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<boolean>;
    }

    /**
     * Request L2 order book.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns L2 order book snapshot.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#l2-book-snapshot
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const l2Book = await client.l2Book({ coin: "ETH", nSigFigs: 2 });
     * ```
     */
    l2Book(args: L2BookParameters, signal?: AbortSignal): Promise<Book> {
        const request: L2BookRequest = {
            type: "l2Book",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<Book>;
    }

    /**
     * Request legal verification status of a user.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Legal verification status for a user.
     *
     * @see null - no documentation
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const legalCheck = await client.legalCheck({ user: "0x..." });
     * ```
     */
    legalCheck(args: LegalCheckParameters, signal?: AbortSignal): Promise<LegalCheck> {
        const request: LegalCheckRequest = {
            type: "legalCheck",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<LegalCheck>;
    }

    /**
     * Request builder fee approval.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Maximum builder fee approval.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#check-builder-fee-approval
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const maxBuilderFee = await client.maxBuilderFee({ user: "0x...", builder: "0x..." });
     * ```
     */
    maxBuilderFee(args: MaxBuilderFeeParameters, signal?: AbortSignal): Promise<number> {
        const request: MaxBuilderFeeRequest = {
            type: "maxBuilderFee",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<number>;
    }

    /**
     * Request trading metadata.
     * @param signal - An optional abort signal.
     * @returns Metadata for perpetual assets.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-perpetuals-metadata
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const meta = await client.meta();
     * ```
     */
    meta(signal?: AbortSignal): Promise<PerpsMeta> {
        const request: MetaRequest = {
            type: "meta",
        };
        return this.transport.request("info", request, signal) as Promise<PerpsMeta>;
    }

    /**
     * Request metadata and asset contexts.
     * @param signal - An optional abort signal.
     * @returns Metadata and context information for each perpetual asset.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-perpetuals-asset-contexts-includes-mark-price-current-funding-open-interest-etc
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const [meta, assetCtxs] = await client.metaAndAssetCtxs();
     * ```
     */
    metaAndAssetCtxs(signal?: AbortSignal): Promise<PerpsMetaAndAssetCtxs> {
        const request: MetaAndAssetCtxsRequest = {
            type: "metaAndAssetCtxs",
        };
        return this.transport.request("info", request, signal) as Promise<PerpsMetaAndAssetCtxs>;
    }

    /**
     * Request open orders.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of open order.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-a-users-open-orders
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const openOrders = await client.openOrders({ user: "0x..." });
     * ```
     */
    openOrders(args: OpenOrdersParameters, signal?: AbortSignal): Promise<Order[]> {
        const request: OpenOrdersRequest = {
            type: "openOrders",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<Order[]>;
    }

    /**
     * Request order status.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Result of an order status lookup.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#query-order-status-by-oid-or-cloid
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const orderStatus = await client.orderStatus({ user: "0x...", oid: 12345 });
     * ```
     */
    orderStatus(args: OrderStatusParameters, signal?: AbortSignal): Promise<OrderLookup> {
        const request: OrderStatusRequest = {
            type: "orderStatus",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<OrderLookup>;
    }

    /**
     * Request perpetuals at open interest cap.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of perpetuals at open interest caps.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#query-perps-at-open-interest-caps
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const perpsAtOpenInterestCap = await client.perpsAtOpenInterestCap();
     * ```
     */
    perpsAtOpenInterestCap(signal?: AbortSignal): Promise<string[]> {
        const request: PerpsAtOpenInterestCapRequest = {
            type: "perpsAtOpenInterestCap",
        };
        return this.transport.request("info", request, signal) as Promise<string[]>;
    }

    /**
     * Request portfolio.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Portfolio of a user.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#query-a-users-portfolio
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const portfolio = await client.portfolio({ user: "0x..." });
     * ```
     */
    portfolio(args: PortfolioParameters, signal?: AbortSignal): Promise<PortfolioPeriods> {
        const request: PortfolioRequest = {
            type: "portfolio",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<PortfolioPeriods>;
    }

    /**
     * Request predicted funding rates.
     * @param signal - An optional abort signal.
     * @returns Array of predicted funding rates.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-predicted-funding-rates-for-different-venues
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const predictedFundings = await client.predictedFundings();
     * ```
     */
    predictedFundings(signal?: AbortSignal): Promise<PredictedFunding[]> {
        const request: PredictedFundingsRequest = {
            type: "predictedFundings",
        };
        return this.transport.request("info", request, signal) as Promise<PredictedFunding[]>;
    }

    /**
     * Request user's existence check before transfer.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Pre-transfer user existence check result.
     *
     * @see null - no documentation
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const preTransferCheck = await client.preTransferCheck({ user: "0x...", source: "0x..." });
     * ```
     */
    preTransferCheck(args: PreTransferCheckParameters, signal?: AbortSignal): Promise<PreTransferCheck> {
        const request: PreTransferCheckRequest = {
            type: "preTransferCheck",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<PreTransferCheck>;
    }

    /**
     * Request user referral.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Referral information for a user.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#query-a-users-referral-information
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const referral = await client.referral({ user: "0x..." });
     * ```
     */
    referral(args: ReferralParameters, signal?: AbortSignal): Promise<Referral> {
        const request: ReferralRequest = {
            type: "referral",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<Referral>;
    }

    /**
     * Request spot clearinghouse state.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Balances for spot tokens.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/spot#retrieve-a-users-token-balances
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const spotClearinghouseState = await client.spotClearinghouseState({ user: "0x..." });
     * ```
     */
    spotClearinghouseState(
        args: SpotClearinghouseStateParameters,
        signal?: AbortSignal,
    ): Promise<SpotClearinghouseState> {
        const request: SpotClearinghouseStateRequest = {
            type: "spotClearinghouseState",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<SpotClearinghouseState>;
    }

    /**
     * Request spot deploy state.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns The deploy state of a user.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/spot#retrieve-information-about-the-spot-deploy-auction
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const spotDeployState = await client.spotDeployState({ user: "0x..." });
     * ```
     */
    spotDeployState(args: SpotDeployStateParameters, signal?: AbortSignal): Promise<SpotDeployState> {
        const request: SpotDeployStateRequest = {
            type: "spotDeployState",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<SpotDeployState>;
    }

    /**
     * Request spot trading metadata.
     * @param signal - An optional abort signal.
     * @returns Metadata for spot assets.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/spot#retrieve-spot-metadata
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const spotMeta = await client.spotMeta();
     * ```
     */
    spotMeta(signal?: AbortSignal): Promise<SpotMeta> {
        const request: SpotMetaRequest = {
            type: "spotMeta",
        };
        return this.transport.request("info", request, signal) as Promise<SpotMeta>;
    }

    /**
     * Request spot metadata and asset contexts.
     * @param signal - An optional abort signal.
     * @returns Metadata and context information for each spot asset.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/spot#retrieve-spot-asset-contexts
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const [spotMeta, spotAssetCtxs] = await client.spotMetaAndAssetCtxs();
     * ```
     */
    spotMetaAndAssetCtxs(signal?: AbortSignal): Promise<SpotMetaAndAssetCtxs> {
        const request: SpotMetaAndAssetCtxsRequest = {
            type: "spotMetaAndAssetCtxs",
        };
        return this.transport.request("info", request, signal) as Promise<SpotMetaAndAssetCtxs>;
    }

    /**
     * Request user sub-accounts.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of user sub-account or null if the user does not have any sub-accounts.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-a-users-subaccounts
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const subAccounts = await client.subAccounts({ user: "0x..." });
     * ```
     */
    subAccounts(args: SubAccountsParameters, signal?: AbortSignal): Promise<SubAccount[] | null> {
        const request: SubAccountsRequest = {
            type: "subAccounts",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<SubAccount[] | null>;
    }

    /**
     * Request token details.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns The details of a token.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/spot#retrieve-information-about-a-token
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const tokenDetails = await client.tokenDetails({ tokenId: "0x..." });
     * ```
     */
    tokenDetails(args: TokenDetailsParameters, signal?: AbortSignal): Promise<TokenDetails> {
        const request: TokenDetailsRequest = {
            type: "tokenDetails",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<TokenDetails>;
    }

    /**
     * Request twap history of a user.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns The twap history of a user.
     *
     * @see null - no documentation
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const twapHistory = await client.twapHistory({ user: "0x..." });
     * ```
     */
    twapHistory(args: TwapHistoryParameters, signal?: AbortSignal): Promise<TwapHistory[]> {
        const request: TwapHistoryRequest = {
            type: "twapHistory",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<TwapHistory[]>;
    }

    /**
     * Transaction details by transaction hash.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Transaction details response.
     *
     * @see null - no documentation
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const { tx } = await client.txDetails({ hash: "0x..." });
     * ```
     */
    txDetails(args: TxDetailsParameters, signal?: AbortSignal): Promise<TxDetailsResponse> {
        const request: TxDetailsRequest = {
            type: "txDetails",
            ...args,
        };
        return this.transport.request("explorer", request, signal) as Promise<TxDetailsResponse>;
    }

    /**
     * User details by user's address.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns User details response.
     *
     * @see null - no documentation
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const { txs } = await client.userDetails({ user: "0x..." });
     * ```
     */
    userDetails(args: UserDetailsParameters, signal?: AbortSignal): Promise<UserDetailsResponse> {
        const request: UserDetailsRequest = {
            type: "userDetails",
            ...args,
        };
        return this.transport.request("explorer", request, signal) as Promise<UserDetailsResponse>;
    }

    /**
     * Request user fees.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns User fees.
     *
     * @see null - no documentation
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const fees = await client.userFees({ user: "0x..." });
     * ```
     */
    userFees(args: UserFeesParameters, signal?: AbortSignal): Promise<UserFees> {
        const request: UserFeesRequest = {
            type: "userFees",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<UserFees>;
    }

    /**
     * Request user fills.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of user's trade fill.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-a-users-fills
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const fills = await client.userFills({ user: "0x..." });
     * ```
     */
    userFills(args: UserFillsParameters, signal?: AbortSignal): Promise<Fill[]> {
        const request: UserFillsRequest = {
            type: "userFills",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<Fill[]>;
    }

    /**
     * Request user fills by time.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of user's trade fill.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-a-users-fills-by-time
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const fills = await client.userFillsByTime({
     *   user: "0x...",
     *   startTime: Date.now() - 1000 * 60 * 60 * 24
     * });
     * ```
     */
    userFillsByTime(args: UserFillsByTimeParameters, signal?: AbortSignal): Promise<Fill[]> {
        const request: UserFillsByTimeRequest = {
            type: "userFillsByTime",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<Fill[]>;
    }

    /**
     * Request user funding.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of user's funding ledger update.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-a-users-funding-history-or-non-funding-ledger-updates
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const funding = await client.userFunding({
     *   user: "0x...",
     *   startTime: Date.now() - 1000 * 60 * 60 * 24
     * });
     * ```
     */
    userFunding(args: UserFundingParameters, signal?: AbortSignal): Promise<UserFundingUpdate[]> {
        const request: UserFundingRequest = {
            type: "userFunding",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<UserFundingUpdate[]>;
    }

    /**
     * Request user non-funding ledger updates.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of user's non-funding ledger update.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-a-users-funding-history-or-non-funding-ledger-updates
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const nonFundingLedgerUpdates = await client.userNonFundingLedgerUpdates({
     *   user: "0x...",
     *   startTime: Date.now() - 1000 * 60 * 60 * 24
     * });
     * ```
     */
    userNonFundingLedgerUpdates(
        args: UserNonFundingLedgerUpdatesParameters,
        signal?: AbortSignal,
    ): Promise<UserNonFundingLedgerUpdate[]> {
        const request: UserNonFundingLedgerUpdatesRequest = {
            type: "userNonFundingLedgerUpdates",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<UserNonFundingLedgerUpdate[]>;
    }

    /**
     * Request user rate limits.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns User's rate limits.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#query-user-rate-limits
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const rateLimit = await client.userRateLimit({ user: "0x..." });
     * ```
     */
    userRateLimit(args: UserRateLimitParameters, signal?: AbortSignal): Promise<UserRateLimit> {
        const request: UserRateLimitRequest = {
            type: "userRateLimit",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<UserRateLimit>;
    }

    /**
     * Request user role.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns User's role.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#query-a-users-role
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const userRole = await client.userRole({ user: "0x..." });
     * ```
     */
    userRole(args: UserRoleParameters, signal?: AbortSignal): Promise<UserRole> {
        const request: UserRoleRequest = {
            type: "userRole",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<UserRole>;
    }

    /**
     * Request multi-sig signers for a user.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Multi-sig signers for a user or null if the user does not have any multi-sig signers.
     *
     * @see null - no documentation
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const multiSigSigners = await client.userToMultiSigSigners({ user: "0x..." });
     * ```
     */
    userToMultiSigSigners(
        args: UserToMultiSigSignersParameters,
        signal?: AbortSignal,
    ): Promise<MultiSigSigners | null> {
        const request: UserToMultiSigSignersRequest = {
            type: "userToMultiSigSigners",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<MultiSigSigners | null>;
    }

    /**
     * Request user twap slice fills.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of user's twap slice fill.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-a-users-twap-slice-fills
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const twapSliceFills = await client.userTwapSliceFills({ user: "0x..." });
     * ```
     */
    userTwapSliceFills(args: UserTwapSliceFillsParameters, signal?: AbortSignal): Promise<TwapSliceFill[]> {
        const request: UserTwapSliceFillsRequest = {
            type: "userTwapSliceFills",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<TwapSliceFill[]>;
    }

    /**
     * Request user twap slice fills by time.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of user's twap slice fill.
     *
     * @see null - no documentation
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const twapSliceFillsByTime = await client.userTwapSliceFillsByTime({
     *   user: "0x...",
     *   startTime: Date.now() - 1000 * 60 * 60 * 24
     * });
     * ```
     */
    userTwapSliceFillsByTime(args: UserTwapSliceFillsByTimeParameters, signal?: AbortSignal): Promise<TwapSliceFill[]> {
        const request: UserTwapSliceFillsByTimeRequest = {
            type: "userTwapSliceFillsByTime",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<TwapSliceFill[]>;
    }

    /**
     * Request user vault deposits.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of user's vault deposits.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-a-users-vault-deposits
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const userVaultEquities = await client.userVaultDeposits({ user: "0x..." });
     * ```
     */
    userVaultEquities(args: UserVaultEquitiesParameters, signal?: AbortSignal): Promise<VaultEquity[]> {
        const request: UserVaultEquitiesRequest = {
            type: "userVaultEquities",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<VaultEquity[]>;
    }

    /**
     * Request validator summaries.
     * @param args - The parameters for the request.
     * @returns Array of validator summaries.
     *
     * @see null - no documentation
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const validatorSummaries = await client.validatorSummaries();
     * ```
     */
    validatorSummaries(signal?: AbortSignal): Promise<ValidatorSummary[]> {
        const request: ValidatorSummariesRequest = {
            type: "validatorSummaries",
        };
        return this.transport.request("info", request, signal) as Promise<ValidatorSummary[]>;
    }

    /**
     * Request details of a vault.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Details of a vault or null if the vault does not exist.
     *
     * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#retrieve-details-for-a-vault
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const vaultDetails = await client.vaultDetails({ vaultAddress: "0x..." });
     * ```
     */
    vaultDetails(args: VaultDetailsParameters, signal?: AbortSignal): Promise<VaultDetails | null> {
        const request: VaultDetailsRequest = {
            type: "vaultDetails",
            ...args,
        };
        return this.transport.request("info", request, signal) as Promise<VaultDetails | null>;
    }

    /**
     * Request a list of vaults less than 2 hours old.
     * @param args - The parameters for the request.
     * @param signal - An optional abort signal.
     * @returns Array of vault summaries.
     *
     * @see null - no documentation
     * @example
     * ```ts
     * import * as hl from "@nktkas/hyperliquid";
     *
     * const transport = new hl.HttpTransport(); // or WebSocketTransport
     * const client = new hl.PublicClient({ transport });
     *
     * const vaultSummaries = await client.vaultSummaries();
     * ```
     */
    vaultSummaries(signal?: AbortSignal): Promise<VaultSummary[]> {
        const request: VaultSummariesRequest = {
            type: "vaultSummaries",
        };
        return this.transport.request("info", request, signal) as Promise<VaultSummary[]>;
    }
}
