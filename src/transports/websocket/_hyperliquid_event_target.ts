import { TypedEventTarget } from "@derzade/typescript-event-target";
import type { BlockDetails, TxDetails } from "../../types/explorer/responses.ts";

/** Represents a message from the Hyperliquid WebSocket API. */
interface HyperliquidMsg {
    /** Event channel name. */
    channel: string;
    /** Channel-specific data. */
    data: unknown;
}

/** Base system events and dynamic channel events for Hyperliquid WebSocket API. */
interface HyperliquidEventMap {
    /** Subscription created/removed event. */
    subscriptionResponse: CustomEvent<{
        /** Type of subscription operation. */
        method: "subscribe" | "unsubscribe";
        /** Original subscription request. */
        subscription: unknown;
    }>;

    /** Response to post request event. */
    post: CustomEvent<{
        /** Unique request identifier. */
        id: number;
        /** Server response. */
        response:
            /** Response containing requested information. */
            | {
                /** Indicates that this is an informational response. */
                type: "info";
                /** Contains the information data. */
                payload: {
                    /** Type of information being returned. */
                    type: string;
                    /** Information specific data. */
                    data: unknown;
                };
            }
            /** Response containing action result. */
            | {
                /** Indicates that this is an action response. */
                type: "action";
                /** Contains the action result data. */
                payload: {
                    /** Response status indicating success or failure of the action. */
                    status: "ok" | "err";
                    /** Success data or error message. */
                    response:
                        | {
                            /** Type of operation. */
                            type: string;
                            /** Specific data for the operation. */
                            data?: unknown;
                        }
                        | string;
                };
            };
    }>;

    /** Error response for message event. */
    error: CustomEvent<string>;

    /** Pong response event. */
    pong: CustomEvent<undefined>;

    /** Block explorer update event. */
    _explorerBlock: CustomEvent<Omit<BlockDetails, "txs">[]>;

    /** Transaction explorer update event. */
    _explorerTxs: CustomEvent<TxDetails[]>;

    /** Subscribed channel event. */
    [key: string]: CustomEvent<unknown>;
}

/** Listens for WebSocket messages and sends them as Hyperliquid typed events. */
export class HyperliquidEventTarget extends TypedEventTarget<HyperliquidEventMap> {
    constructor(socket: WebSocket) {
        super();
        socket.addEventListener("message", (event) => {
            try {
                const msg = JSON.parse(event.data) as unknown;
                if (isHyperliquidMsg(msg)) {
                    this.dispatchEvent(new CustomEvent(msg.channel, { detail: msg.data }));
                } else if (isExplorerBlockMsg(msg)) {
                    this.dispatchEvent(new CustomEvent("_explorerBlock", { detail: msg }));
                } else if (isExplorerTxsMsg(msg)) {
                    this.dispatchEvent(new CustomEvent("_explorerTxs", { detail: msg }));
                }
            } catch {
                // Ignore JSON parsing errors
            }
        });
    }
}

/** Type guard for Hyperliquid messages. */
function isHyperliquidMsg(value: unknown): value is HyperliquidMsg {
    return typeof value === "object" && value !== null &&
        "channel" in value && typeof value.channel === "string";
}

/** Type guard for explorer block messages. */
function isExplorerBlockMsg(value: unknown): value is Omit<BlockDetails, "txs">[] {
    return Array.isArray(value) && value.length > 0 &&
        (typeof value[0] === "object" && value[0] !== null && !Array.isArray(value[0]) &&
            "height" in value[0] && typeof value[0].height === "number" &&
            "blockTime" in value[0] && typeof value[0].blockTime === "number" &&
            "hash" in value[0] && typeof value[0].hash === "string" &&
            "proposer" in value[0] && typeof value[0].proposer === "string" &&
            "numTxs" in value[0] && typeof value[0].numTxs === "number");
}

/** Type guard for explorer transactions messages. */
function isExplorerTxsMsg(value: unknown): value is TxDetails[] {
    return Array.isArray(value) && value.length > 0 &&
        (typeof value[0] === "object" && value[0] !== null && !Array.isArray(value[0]) &&
            "action" in value[0] && typeof value[0].action === "object" && value[0].action !== null &&
            "block" in value[0] && typeof value[0].block === "number" &&
            "error" in value[0] && (typeof value[0].error === "string" || value[0].error === null) &&
            "hash" in value[0] && typeof value[0].hash === "string" &&
            "time" in value[0] && typeof value[0].time === "number" &&
            "user" in value[0] && typeof value[0].user === "string");
}
