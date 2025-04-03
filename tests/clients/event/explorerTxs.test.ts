import { deadline } from "jsr:@std/async@^1.0.10/deadline";
import { EventClient, WebSocketTransport } from "../../../mod.ts";
import { schemaGenerator } from "../../_utils/schema/schemaGenerator.ts";
import { schemaCoverage } from "../../_utils/schema/schemaCoverage.ts";

// —————————— Type schema ——————————

export type MethodReturnType = Parameters<Parameters<EventClient["explorerTxs"]>[0]>[0];
const MethodReturnType = schemaGenerator(import.meta.url, "MethodReturnType");

// —————————— Test ——————————

Deno.test("explorerTxs", async () => {
    if (!Deno.args.includes("--not-wait")) await new Promise((resolve) => setTimeout(resolve, 1000));

    // —————————— Prepare ——————————

    const transport = new WebSocketTransport({ url: "wss://rpc.hyperliquid-testnet.xyz/ws" });
    const client = new EventClient({ transport });

    // —————————— Test ——————————

    const data = await deadline(
        new Promise((resolve) => {
            client.explorerTxs(resolve);
        }),
        120_000,
    );

    schemaCoverage(MethodReturnType, [data], {
        ignoreTypesByPath: {
            "#/items/properties/error": ["string"],
        },
    });

    // —————————— Cleanup ——————————

    await transport.close();
});
