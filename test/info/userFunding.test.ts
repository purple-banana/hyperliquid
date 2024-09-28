import { type Hex, HyperliquidInfoClient } from "../../index.ts";
import { assertJsonSchema, recursiveTraversal } from "../utils.ts";
import * as tsj from "npm:ts-json-schema-generator@^2.3.0";
import { resolve } from "jsr:@std/path@^1.0.2";
import { assert, assertGreater } from "jsr:@std/assert@^1.0.4";

const USER_ADDRESS: Hex = "0x563C175E6f11582f65D6d9E360A618699DEe14a9";

Deno.test("userFunding", async (t) => {
    // Create HyperliquidInfoClient
    const client = new HyperliquidInfoClient("https://api.hyperliquid-testnet.xyz/info");

    // Create TypeScript type schemas
    const tsjSchemaGenerator = tsj.createGenerator({ path: resolve("./src/types/info.d.ts"), skipTypeCheck: true });
    const schema = tsjSchemaGenerator.createSchema("UserFunding");

    // Test
    await t.step("user + startTime", async () => {
        const data = await client.userFunding({
            user: USER_ADDRESS,
            startTime: Date.now() - 1000 * 60 * 60 * 24 * 365,
        });

        assert(Array.isArray(data), "WARNING: Unable to fully validate the type due to an empty array");
        data.forEach((item) => assertJsonSchema(schema, item));

        recursiveTraversal(data, (key, value) => {
            if (Array.isArray(value)) {
                assertGreater(
                    value.length,
                    0,
                    `WARNING: Unable to fully validate the type due to an empty array. Key: ${key}`,
                );
            }
        });
    });

    await t.step("user + startTime + endTime", async () => {
        const data = await client.userFunding({
            user: USER_ADDRESS,
            startTime: Date.now() - 1000 * 60 * 60 * 24 * 365,
            endTime: Date.now(),
        });

        assert(Array.isArray(data), "WARNING: Unable to fully validate the type due to an empty array");
        data.forEach((item) => assertJsonSchema(schema, item));

        recursiveTraversal(data, (key, value) => {
            if (Array.isArray(value)) {
                assertGreater(
                    value.length,
                    0,
                    `WARNING: Unable to fully validate the type due to an empty array. Key: ${key}`,
                );
            }
        });
    });
});
