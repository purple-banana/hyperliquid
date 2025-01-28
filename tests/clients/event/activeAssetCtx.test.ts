import * as tsj from "npm:ts-json-schema-generator@^2.3.0";
import { deadline } from "jsr:@std/async@^1.0.10/deadline";
import { EventClient, WebSocketTransport, type WsActiveAssetCtx, type WsActiveSpotAssetCtx } from "../../../mod.ts";
import { assertJsonSchema } from "../../utils.ts";

// FIXME: Not an in-depth test
Deno.test("activeAssetCtx", async (t) => {
    // —————————— Type schema ——————————

    const tsGenerator = tsj.createGenerator({ path: "./mod.ts", skipTypeCheck: true });
    const WsActiveAssetCtx = tsGenerator.createSchema("WsActiveAssetCtx");
    const WsActiveSpotAssetCtx = tsGenerator.createSchema("WsActiveSpotAssetCtx");

    // —————————— Prepare ——————————

    const transport = new WebSocketTransport({ url: "wss://api.hyperliquid-testnet.xyz/ws" });
    const client = new EventClient({ transport });

    // —————————— Test ——————————

    await t.step("return type === WsActiveAssetCtx", async (st) => {
        await st.step("Matching data to type schema", async () => {
            const data = await deadline(
                new Promise<WsActiveAssetCtx>((resolve, reject) => {
                    const subscrPromise = client.activeAssetCtx({ coin: "BTC" }, async (data) => {
                        try {
                            await (await subscrPromise).unsubscribe();
                            resolve(data as WsActiveAssetCtx);
                        } catch (error) {
                            reject(error);
                        }
                    });
                }),
                15_000,
            );
            assertJsonSchema(WsActiveAssetCtx, data);
        });
    });

    await t.step("return type === WsActiveSpotAssetCtx", async (st) => {
        await st.step("Matching data to type schema", async () => {
            const data = await deadline(
                new Promise<WsActiveSpotAssetCtx>((resolve, reject) => {
                    const subscrPromise = client.activeAssetCtx({ coin: "@107" }, async (data) => {
                        try {
                            await (await subscrPromise).unsubscribe();
                            resolve(data as WsActiveSpotAssetCtx);
                        } catch (error) {
                            reject(error);
                        }
                    });
                }),
                15_000,
            );
            assertJsonSchema(WsActiveSpotAssetCtx, data);
        });
    });

    // —————————— Cleanup ——————————

    // Close the transport
    await transport.close();
});
