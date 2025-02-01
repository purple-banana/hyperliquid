import type { Hex } from "../common.ts";
import type { PortfolioPeriods } from "./accounts.ts";

/** Details about a vault. */
export interface VaultDetails {
    /** Vault name. */
    name: string;
    /** Vault address. */
    vaultAddress: Hex;
    /** Leader address. */
    leader: Hex;
    /** Vault description. */
    description: string;
    /** Vault portfolio metrics grouped by time periods. */
    portfolio: PortfolioPeriods;
    /** Annual percentage rate. */
    apr: number;
    /** unknown */
    // FIXME: add type
    followerState: unknown | null;
    /** Ownership percentage held by leader. */
    leaderFraction: number;
    /** Leader's commission percentage. */
    leaderCommission: number;
    /** Vault followers list. */
    followers: {
        /** Follower address or "Leader". */
        user: Hex | "Leader";
        /** Follower's vault equity. */
        vaultEquity: string;
        /** Current profit and loss. */
        pnl: string;
        /** All-time profit and loss. */
        allTimePnl: string;
        /** Subscription duration in days. */
        daysFollowing: number;
        /** Vault entry timestamp. */
        vaultEntryTime: number;
        /** Timestamp when funds become unlocked. */
        lockupUntil: number;
    }[];
    /** Maximum distributable amount. */
    maxDistributable: number;
    /** Maximum withdrawable amount. */
    maxWithdrawable: number;
    /** Vault closure status. */
    isClosed: boolean;
    /** Vault relationship type. */
    relationship: VaultRelationship;
    /** Deposit permission status. */
    allowDeposits: boolean;
    /** Position closure policy on withdrawal. */
    alwaysCloseOnWithdraw: boolean;
}

/** User's vault equity details. */
export interface VaultEquity {
    /** Vault address. */
    vaultAddress: Hex;
    /** User's deposited equity. */
    equity: string;
}

/** Vault relationship configuration. */
export type VaultRelationship =
    | {
        /** Relationship type. */
        type: "normal" | "child";
    }
    | {
        /** Relationship type. */
        type: "parent";
        /** Child vault information. */
        data: {
            /** Child vault addresses. */
            childAddresses: Hex[];
        };
    };

/** Summary of a vault. */
export interface VaultSummary {
    /** Vault name. */
    name: string;
    /** Vault address. */
    vaultAddress: Hex;
    /** Leader address. */
    leader: Hex;
    /** Total value locked. */
    tvl: string;
    /** Vault closure status. */
    isClosed: boolean;
    /** Vault relationship type. */
    relationship: VaultRelationship;
    /** Creation timestamp. */
    createTimeMillis: number;
}
