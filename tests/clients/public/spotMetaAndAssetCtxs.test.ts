import * as tsj from "npm:ts-json-schema-generator@^2.3.0";
import { fromFileUrl } from "jsr:@std/path@^1.0.8/from-file-url";
import { assert } from "jsr:@std/assert@^1.0.10";
import { HttpTransport, PublicClient } from "../../../mod.ts";
import { assertJsonSchema } from "../../utils.ts";

// —————————— Type schema ——————————

export type MethodReturnType = ReturnType<PublicClient["spotMetaAndAssetCtxs"]>;
const MethodReturnType = tsj
    .createGenerator({ path: fromFileUrl(import.meta.url), skipTypeCheck: true })
    .createSchema("MethodReturnType");

// —————————— Test ——————————

Deno.test("spotMetaAndAssetCtxs", async (t) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // —————————— Prepare ——————————

    const transport = new HttpTransport({ isTestnet: true });
    const client = new PublicClient({ transport });

    // —————————— Test ——————————

    const data = await client.spotMetaAndAssetCtxs();

    const isMatchToScheme = await t.step("Matching data to type schema", () => {
        assertJsonSchema(MethodReturnType, data);
    });

    await t.step({
        name: "Additional checks",
        fn: async (t) => {
            await t.step("Check key [0]", async (t) => {
                await t.step("Check key 'tokens'", async (t) => {
                    await t.step("Check key 'evmContract'", async (t) => {
                        await t.step("some should be 'null'", () => {
                            assert(data[0].tokens.some((item) => item.evmContract === null));
                        });
                        await t.step("some should be an 'object'", () => {
                            assert(
                                data[0].tokens.some((item) =>
                                    typeof item.evmContract === "object" && item.evmContract !== null
                                ),
                            );
                        });
                    });

                    await t.step("Check key 'fullName'", async (t) => {
                        await t.step("some should be 'null'", () => {
                            assert(data[0].tokens.some((item) => item.fullName === null));
                        });
                        await t.step("some should be a 'string'", () => {
                            assert(data[0].tokens.some((item) => typeof item.fullName === "string"));
                        });
                    });
                });
            });

            await t.step("Check key [1]", async (t) => {
                await t.step("Check key 'midPx'", async (t) => {
                    await t.step("some should be a 'string'", () => {
                        assert(data[1].some((item) => typeof item.midPx === "string"));
                    });
                    await t.step("some should be 'null'", () => {
                        assert(data[1].some((item) => item.midPx === null));
                    });
                });
            });
        },
        ignore: !isMatchToScheme,
    });
});
