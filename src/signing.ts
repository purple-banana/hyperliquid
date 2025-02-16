import { keccak_256 } from "@noble/hashes/sha3";
import { encode, type ValueMap, type ValueType } from "@std/msgpack/encode";
import { decodeHex, encodeHex } from "@std/encoding/hex";
import type { Hex } from "./base.ts";

export type { Hex };
export type { ValueMap, ValueType };

/** Abstract interface for a [viem wallet](https://viem.sh/docs/clients/wallet). */
export interface AbstractViemWalletClient {
    signTypedData(params: {
        domain: {
            name: string;
            version: string;
            chainId: number;
            verifyingContract: Hex;
        };
        types: {
            [key: string]: {
                name: string;
                type: string;
            }[];
        };
        primaryType: string;
        message: Record<string, unknown>;
    }): Promise<Hex>;
}

/** Abstract interface for an extended [viem wallet](https://viem.sh/docs/clients/wallet) (e.g. privy [useSignTypedData](https://docs.privy.io/reference/sdk/react-auth/functions/useSignTypedData#returns)). */
export interface AbstractExtendedViemWalletClient {
    signTypedData(
        params: {
            domain: {
                name: string;
                version: string;
                chainId: number;
                verifyingContract: Hex;
            };
            types: {
                [key: string]: {
                    name: string;
                    type: string;
                }[];
            };
            primaryType: string;
            message: Record<string, unknown>;
        },
        options?: unknown,
    ): Promise<Hex>;
}

/** Abstract interface for an [ethers.js signer](https://docs.ethers.org/v6/api/providers/#Signer). */
export interface AbstractEthersSigner {
    signTypedData(
        domain: {
            name: string;
            version: string;
            chainId: number;
            verifyingContract: string;
        },
        types: {
            [key: string]: {
                name: string;
                type: string;
            }[];
        },
        value: Record<string, unknown>,
    ): Promise<string>;
}

/** Abstract interface for an [ethers.js v5 signer](https://docs.ethers.org/v5/api/providers/#Signer). */
export interface AbstractEthersV5Signer {
    _signTypedData(
        domain: {
            name: string;
            version: string;
            chainId: number;
            verifyingContract: string;
        },
        types: {
            [key: string]: {
                name: string;
                type: string;
            }[];
        },
        value: Record<string, unknown>,
    ): Promise<string>;
}

/** Abstract interface for a [window.ethereum](https://eips.ethereum.org/EIPS/eip-1193) object. */
export interface AbstractWindowEthereum {
    request: (args: { method: string; params: unknown[] }) => Promise<unknown>;
}

/**
 * Create a hash of the L1 action.
 *
 * Note: Hash generation depends on the order of the action keys.
 * @param action - The action to be hashed.
 * @param nonce - Unique request identifier (recommended current timestamp in ms).
 * @param vaultAddress - Optional vault address used in the action.
 * @returns The hash of the action.
 */
export function createL1ActionHash(action: ValueType, nonce: number, vaultAddress?: Hex): Hex {
    const normalizedAction = normalizeIntegersForMsgPack(action);
    const msgPackBytes = encode(normalizedAction);

    const additionalBytesLength = vaultAddress ? 29 : 9;
    const data = new Uint8Array(msgPackBytes.length + additionalBytesLength);
    data.set(msgPackBytes);

    const view = new DataView(data.buffer);
    view.setBigUint64(msgPackBytes.length, BigInt(nonce));

    if (vaultAddress) {
        view.setUint8(msgPackBytes.length + 8, 1);
        data.set(decodeHex(vaultAddress.slice(2)), msgPackBytes.length + 9);
    } else {
        view.setUint8(msgPackBytes.length + 8, 0);
    }

    const hashBytes = keccak_256(data);
    const hashHex = encodeHex(hashBytes);
    return `0x${hashHex}`;
}

/** Layer to make {@link https://jsr.io/@std/msgpack | @std/msgpack} compatible with {@link https://github.com/msgpack/msgpack-javascript | @msgpack/msgpack}. */
function normalizeIntegersForMsgPack(obj: ValueType): ValueType {
    const THIRTY_ONE_BITS = 2147483648;
    const THIRTY_TWO_BITS = 4294967296;

    if (
        typeof obj === "number" && Number.isInteger(obj) &&
        obj <= Number.MAX_SAFE_INTEGER && obj >= Number.MIN_SAFE_INTEGER &&
        (obj >= THIRTY_TWO_BITS || obj < -THIRTY_ONE_BITS)
    ) {
        return BigInt(obj);
    }

    if (Array.isArray(obj)) {
        return obj.map(normalizeIntegersForMsgPack);
    }

    if (obj && typeof obj === "object" && obj !== null) {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, normalizeIntegersForMsgPack(value)]),
        );
    }

    return obj;
}

/**
 * Sign an L1 action.
 *
 * Note: Signature generation depends on the order of the action keys.
 * @param args.wallet - Wallet to sign the action.
 * @param args.action - The action to be signed.
 * @param args.nonce - Unique request identifier (recommended current timestamp in ms).
 * @param args.isTestnet - Indicates if the action is for the testnet. Default is `false`.
 * @param args.vaultAddress - Optional vault address used in the action.
 * @returns The signature components r, s, and v.
 */
export async function signL1Action(args: {
    wallet:
        | AbstractViemWalletClient
        | AbstractExtendedViemWalletClient
        | AbstractEthersSigner
        | AbstractEthersV5Signer
        | AbstractWindowEthereum;
    action: ValueType;
    nonce: number;
    isTestnet?: boolean;
    vaultAddress?: Hex;
}): Promise<{ r: Hex; s: Hex; v: number }> {
    const {
        wallet,
        action,
        nonce,
        isTestnet = false,
        vaultAddress,
    } = args;

    const domain = {
        name: "Exchange",
        version: "1",
        chainId: 1337,
        verifyingContract: "0x0000000000000000000000000000000000000000",
    } as const;
    const types = {
        Agent: [
            { name: "source", type: "string" },
            { name: "connectionId", type: "bytes32" },
        ],
    };

    const actionHash = createL1ActionHash(action, nonce, vaultAddress);
    const message = {
        source: isTestnet ? "b" : "a",
        connectionId: actionHash,
    };

    const signature = await abstractSignTypedData({ wallet, domain, types, message });
    return splitSignature(signature);
}

/**
 * Sign a user-signed action.
 *
 * Note: Signature generation depends on the order of types.
 * @param args.wallet - Wallet to sign the action.
 * @param args.action - The action to be signed.
 * @param args.types - The types of the action.
 * @param args.chainId - The chain ID.
 * @returns The signature components r, s, and v.
 */
export async function signUserSignedAction(args: {
    wallet:
        | AbstractViemWalletClient
        | AbstractExtendedViemWalletClient
        | AbstractEthersSigner
        | AbstractEthersV5Signer
        | AbstractWindowEthereum;
    action: Record<string, unknown>;
    types: { [key: string]: { name: string; type: string }[] };
    chainId: number;
}): Promise<{ r: Hex; s: Hex; v: number }> {
    const { wallet, action, types, chainId } = args;

    const domain = {
        name: "HyperliquidSignTransaction",
        version: "1",
        chainId,
        verifyingContract: "0x0000000000000000000000000000000000000000",
    } as const;

    const signature = await abstractSignTypedData({ wallet, domain, types, message: action });
    return splitSignature(signature);
}

/** Signs typed data with the provided wallet using EIP-712. */
async function abstractSignTypedData(args: {
    wallet:
        | AbstractViemWalletClient
        | AbstractExtendedViemWalletClient
        | AbstractEthersSigner
        | AbstractEthersV5Signer
        | AbstractWindowEthereum;
    domain: {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: Hex;
    };
    types: {
        [key: string]: {
            name: string;
            type: string;
        }[];
    };
    message: Record<string, unknown>;
}): Promise<Hex> {
    const { wallet, domain, types, message } = args;
    if (isAbstractViemWalletClient(wallet) || isAbstractExtendedViemWalletClient(wallet)) {
        const primaryType = Object.keys(types)[0];
        return await wallet.signTypedData({ domain, types, primaryType, message });
    } else if (isAbstractEthersSigner(wallet)) {
        return await wallet.signTypedData(domain, types, message) as Hex;
    } else if (isAbstractEthersV5Signer(wallet)) {
        return await wallet._signTypedData(domain, types, message) as Hex;
    } else if (isAbstractWindowEthereum(wallet)) {
        return await signTypedDataWithWindowEthereum(wallet, domain, types, message);
    } else {
        throw new Error("Unsupported wallet for signing typed data");
    }
}

/** Signs typed data using `window.ethereum` (EIP-1193) with `eth_signTypedData_v4` (EIP-712). */
async function signTypedDataWithWindowEthereum(
    ethereum: AbstractWindowEthereum,
    domain: {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: Hex;
    },
    types: {
        [key: string]: {
            name: string;
            type: string;
        }[];
    },
    message: Record<string, unknown>,
): Promise<Hex> {
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
        params: [],
    });
    if (!Array.isArray(accounts) || accounts.length === 0) {
        throw new Error("No Ethereum accounts available");
    }

    const from = accounts[0] as Hex;
    const dataToSign = JSON.stringify({
        domain,
        types: {
            EIP712Domain: [
                { name: "name", type: "string" },
                { name: "version", type: "string" },
                { name: "chainId", type: "uint256" },
                { name: "verifyingContract", type: "address" },
            ],
            ...types,
        },
        primaryType: Object.keys(types)[0],
        message,
    });
    return await ethereum.request({
        method: "eth_signTypedData_v4",
        params: [from, dataToSign],
    }) as Hex;
}

/** Splits a signature hexadecimal string into its components. */
function splitSignature(signature: Hex): { r: Hex; s: Hex; v: number } {
    const r = `0x${signature.slice(2, 66)}` as const;
    const s = `0x${signature.slice(66, 130)}` as const;
    const v = parseInt(signature.slice(130, 132), 16);
    return { r, s, v };
}

/** Checks if the given value is an abstract viem wallet. */
function isAbstractViemWalletClient(client: unknown): client is AbstractViemWalletClient {
    return typeof client === "object" && client !== null &&
        "signTypedData" in client && typeof client.signTypedData === "function" &&
        client.signTypedData.length === 1;
}

/** Checks if the given value is an abstract extended viem wallet (e.g. privy `useSignTypedData`). */
function isAbstractExtendedViemWalletClient(client: unknown): client is AbstractViemWalletClient {
    return typeof client === "object" && client !== null &&
        "signTypedData" in client && typeof client.signTypedData === "function" &&
        client.signTypedData.length === 2;
}

/** Checks if the given value is an abstract ethers signer. */
function isAbstractEthersSigner(client: unknown): client is AbstractEthersSigner {
    return typeof client === "object" && client !== null &&
        "signTypedData" in client && typeof client.signTypedData === "function" &&
        client.signTypedData.length === 3;
}

/** Checks if the given value is an abstract ethers v5 signer. */
function isAbstractEthersV5Signer(client: unknown): client is AbstractEthersV5Signer {
    return typeof client === "object" && client !== null &&
        "_signTypedData" in client && typeof client._signTypedData === "function" &&
        client._signTypedData.length === 3;
}

/** Checks if the given value is an abstract `window.ethereum` object. */
function isAbstractWindowEthereum(client: unknown): client is AbstractWindowEthereum {
    return typeof client === "object" && client !== null &&
        "request" in client && typeof client.request === "function" &&
        client.request.length >= 1;
}
