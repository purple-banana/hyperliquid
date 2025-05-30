import { deadline } from "jsr:@std/async@^1.0.10/deadline";
import { EventClient, WebSocketTransport } from "../../../mod.ts";
import { schemaGenerator } from "../../_utils/schema/schemaGenerator.ts";
import { schemaCoverage } from "../../_utils/schema/schemaCoverage.ts";

// —————————— Type schema ——————————

export type MethodReturnType = Parameters<Parameters<EventClient["l2Book"]>[1]>[0];
const MethodReturnType = schemaGenerator(import.meta.url, "MethodReturnType");

// —————————— Test ——————————

Deno.test("l2Book", async () => {
    if (!Deno.args.includes("--not-wait")) await new Promise((resolve) => setTimeout(resolve, 1000));

    // —————————— Prepare ——————————

    const transport = new WebSocketTransport({ url: "wss://api.hyperliquid-testnet.xyz/ws" });
    const client = new EventClient({ transport });

    // —————————— Test ——————————

    const data = await Promise.all([
        // Check without arguments
        deadline(
            new Promise((resolve) => {
                client.l2Book({ coin: "BTC" }, resolve);
            }),
            15_000,
        ),
        // Check argument 'nSigFigs'
        deadline(
            new Promise((resolve) => {
                client.l2Book({ coin: "BTC", nSigFigs: 2 }, resolve);
            }),
            15_000,
        ),
        deadline(
            new Promise((resolve) => {
                client.l2Book({ coin: "BTC", nSigFigs: 3 }, resolve);
            }),
            15_000,
        ),
        deadline(
            new Promise((resolve) => {
                client.l2Book({ coin: "BTC", nSigFigs: 4 }, resolve);
            }),
            15_000,
        ),
        deadline(
            new Promise((resolve) => {
                client.l2Book({ coin: "BTC", nSigFigs: 5 }, resolve);
            }),
            15_000,
        ),
        deadline(
            new Promise((resolve) => {
                client.l2Book({ coin: "BTC", nSigFigs: null }, resolve);
            }),
            15_000,
        ),
        deadline(
            new Promise((resolve) => {
                client.l2Book({ coin: "BTC", nSigFigs: undefined }, resolve);
            }),
            15_000,
        ),
        // Check argument 'mantissa'
        deadline(
            new Promise((resolve) => {
                client.l2Book(
                    { coin: "BTC", nSigFigs: 5, mantissa: 2 },
                    resolve,
                );
            }),
            15_000,
        ),
        deadline(
            new Promise((resolve) => {
                client.l2Book(
                    { coin: "BTC", nSigFigs: 5, mantissa: 5 },
                    resolve,
                );
            }),
            15_000,
        ),
        deadline(
            new Promise((resolve) => {
                client.l2Book(
                    { coin: "BTC", nSigFigs: 5, mantissa: null },
                    resolve,
                );
            }),
            15_000,
        ),
        deadline(
            new Promise((resolve) => {
                client.l2Book(
                    { coin: "BTC", nSigFigs: 5, mantissa: undefined },
                    resolve,
                );
            }),
            15_000,
        ),
    ]);

    schemaCoverage(MethodReturnType, data);

    // —————————— Cleanup ——————————

    await transport.close();
});
