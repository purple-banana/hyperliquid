import * as tsj from "npm:ts-json-schema-generator@^2.3.0";
import { assert } from "jsr:@std/assert@^1.0.10";
import { HttpTransport, PublicClient } from "../../../mod.ts";
import { assertJsonSchema } from "../../utils.ts";

// —————————— Constants ——————————

const USER_ADDRESS = "0x563C175E6f11582f65D6d9E360A618699DEe14a9";

// —————————— Type schema ——————————

export type MethodReturnType = ReturnType<PublicClient["userFills"]>;
const MethodReturnType = tsj
    .createGenerator({ path: import.meta.url, skipTypeCheck: true })
    .createSchema("MethodReturnType");

// —————————— Test ——————————

Deno.test("userFills", async (t) => {
    // —————————— Prepare ——————————

    const transport = new HttpTransport({ url: "https://api.hyperliquid-testnet.xyz" });
    const client = new PublicClient({ transport });

    // —————————— Test ——————————

    const data = await client.userFills({ user: USER_ADDRESS });

    const isMatchToScheme = await t.step("Matching data to type schema", () => {
        assertJsonSchema(MethodReturnType, data);
    });

    await t.step({
        name: "Additional checks",
        fn: async (t) => {
            await t.step("Check keys", async (t) => {
                await t.step("Check key 'side'", async (t) => {
                    await t.step("some should be 'B'", () => {
                        assert(data.some((item) => item.side === "B"));
                    });
                    await t.step("some should be 'A'", () => {
                        assert(data.some((item) => item.side === "A"));
                    });
                });

                await t.step("Check key 'cloid'", async (t) => {
                    await t.step("some should be a 'string'", () => {
                        assert(data.some((item) => typeof item.cloid === "string"));
                    });
                    await t.step("some should be 'undefined'", () => {
                        assert(data.some((item) => typeof item.cloid === "undefined"));
                    });
                });

                await t.step("Check key 'liquidation'", async (t) => {
                    await t.step("some should be 'undefined'", () => {
                        assert(data.some((item) => typeof item.liquidation === "undefined"));
                    });
                    await t.step("some should be an 'object'", () => {
                        assert(data.some((item) => typeof item.liquidation === "object" && item.liquidation !== null));
                    });
                    await t.step("Check key 'method'", async (t) => {
                        await t.step("some should be 'market'", () => {
                            assert(data.some((item) => item.liquidation?.method === "market"));
                        });
                        await t.step("some should be 'backstop'", () => {
                            assert(data.some((item) => item.liquidation?.method === "backstop"));
                        });
                    });
                });
            });

            await t.step("Check arguments", async (t) => {
                await t.step("Check argument 'aggregateByTime'", async (t) => {
                    await t.step("aggregateByTime: true", async () => {
                        const data = await client.userFills({ user: USER_ADDRESS, aggregateByTime: true });
                        assertJsonSchema(MethodReturnType, data);
                    });
                    await t.step("aggregateByTime: false", async () => {
                        const data = await client.userFills({ user: USER_ADDRESS, aggregateByTime: false });
                        assertJsonSchema(MethodReturnType, data);
                    });
                    await t.step("aggregateByTime: undefined", async () => {
                        const data = await client.userFills({ user: USER_ADDRESS, aggregateByTime: undefined });
                        assertJsonSchema(MethodReturnType, data);
                    });
                });
            });
        },
        ignore: !isMatchToScheme,
    });
});
