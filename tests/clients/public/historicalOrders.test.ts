import * as tsj from "npm:ts-json-schema-generator@^2.3.0";
import { assert, assertGreater } from "jsr:@std/assert@^1.0.10";
import { HttpTransport, PublicClient } from "../../../index.ts";
import { assertJsonSchema } from "../../utils.ts";

const USER_ADDRESS = "0x563C175E6f11582f65D6d9E360A618699DEe14a9";

Deno.test("historicalOrders", async (t) => {
    // Create a scheme of type
    const typeSchema = tsj
        .createGenerator({ path: "./index.ts", skipTypeCheck: true })
        .createSchema("OrderStatus");

    // Create client
    const transport = new HttpTransport({ url: "https://api.hyperliquid-testnet.xyz" });
    const client = new PublicClient({ transport });

    //Test
    const data = await client.historicalOrders({ user: USER_ADDRESS });

    const isMatchToScheme = await t.step("Matching data to type schema", () => {
        assertGreater(data.length, 0, "Expected data to have at least one element");
        data.forEach((item) => assertJsonSchema(typeSchema, item));
    });

    await t.step({
        name: "Additional checks",
        fn: async (t) => {
            await t.step("Check key 'status'", async (t) => {
                await t.step(
                    "some must be 'filled'",
                    () => assert(data.some((item) => item.status === "filled")),
                );
                await t.step(
                    "some must be 'open'",
                    () => assert(data.some((item) => item.status === "open")),
                );
                await t.step(
                    "some must be 'canceled'",
                    () => assert(data.some((item) => item.status === "canceled")),
                );
                await t.step(
                    "some must be 'triggered'",
                    () => assert(data.some((item) => item.status === "triggered")),
                );
                await t.step(
                    "some must be 'rejected'",
                    () => assert(data.some((item) => item.status === "rejected")),
                );

                // Failed to find an order with `status === marginCanceled`
                await t.step({ name: "some must be 'marginCanceled'", fn: () => {}, ignore: true });
            });
        },
        ignore: !isMatchToScheme,
    });
});
