import { assertRejects } from "jsr:@std/assert@^1.0.10";
import { privateKeyToAccount } from "npm:viem@^2.21.7/accounts";
import { ApiRequestError, HttpTransport, WalletClient } from "../../../mod.ts";

// —————————— Constants ——————————

const PRIVATE_KEY = Deno.args[0] as `0x${string}`;

// —————————— Test ——————————

// NOTE: This API is difficult to test with a successful response.
// So to prove that the method works, we will expect a specific error
Deno.test("spotDeploy", async (t) => {
    if (!Deno.args.includes("--not-wait")) await new Promise((resolve) => setTimeout(resolve, 1000));

    // —————————— Prepare ——————————

    const account = privateKeyToAccount(PRIVATE_KEY);
    const transport = new HttpTransport({ isTestnet: true });
    const walletClient = new WalletClient({ wallet: account, transport, isTestnet: true });

    // —————————— Test ——————————

    await t.step("Step 1", async () => {
        await assertRejects(
            () =>
                walletClient.spotDeploy({
                    registerToken2: {
                        spec: {
                            name: "TestToken",
                            szDecimals: 8,
                            weiDecimals: 8,
                        },
                        maxGas: 1000000,
                        fullName: "TestToken (TT)",
                    },
                }),
            ApiRequestError,
            "Error deploying spot:",
        );
    });

    await t.step("Step 2", async () => {
        await assertRejects(
            () =>
                walletClient.spotDeploy({
                    userGenesis: {
                        token: 0,
                        userAndWei: [],
                        existingTokenAndWei: [],
                    },
                }),
            ApiRequestError,
            "Genesis error:",
        );
    });

    await t.step("Step 3", async () => {
        await assertRejects(
            () =>
                walletClient.spotDeploy({
                    genesis: {
                        token: 0,
                        maxSupply: "10000000000",
                    },
                }),
            ApiRequestError,
            "Genesis error:",
        );
    });

    await t.step("Step 4", async () => {
        await assertRejects(
            () =>
                walletClient.spotDeploy({
                    registerSpot: {
                        tokens: [0, 0],
                    },
                }),
            ApiRequestError,
            "Error deploying spot:",
        );
    });

    await t.step("Step 5", async () => {
        await assertRejects(
            () =>
                walletClient.spotDeploy({
                    registerHyperliquidity: {
                        spot: 0,
                        startPx: "1",
                        orderSz: "1",
                        nOrders: 1,
                        nSeededLevels: 1,
                    },
                }),
            ApiRequestError,
            "Error deploying spot:",
        );
    });
});
