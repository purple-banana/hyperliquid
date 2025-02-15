import { privateKeyToAccount } from "npm:viem@^2.21.54/accounts";
import { assertRejects } from "jsr:@std/assert@^1.0.10";
import { ApiRequestError, HttpTransport, WalletClient } from "../../../mod.ts";
import { isHex } from "../../utils.ts";

// —————————— Constants ——————————

const TEST_PRIVATE_KEY = Deno.args[0] as string | undefined;
const TEST_PERPS_ASSET = Deno.args[1] as string | undefined;

if (!isHex(TEST_PRIVATE_KEY)) {
    throw new Error(`Expected a hex string, but got ${typeof TEST_PRIVATE_KEY}`);
}
if (typeof TEST_PERPS_ASSET !== "string") {
    throw new Error(`Expected a string, but got ${typeof TEST_PERPS_ASSET}`);
}

// —————————— Test ——————————

Deno.test("_validateResponse", async (t) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // —————————— Prepare ——————————

    const account = privateKeyToAccount(TEST_PRIVATE_KEY);
    const transport = new HttpTransport({ url: "https://api.hyperliquid-testnet.xyz" });
    const walletClient = new WalletClient({ wallet: account, transport, isTestnet: true });

    // —————————— Test ——————————

    await t.step("CancelResponse", async () => {
        await assertRejects(
            () => walletClient.cancel({ cancels: [{ a: 0, o: 0 }] }),
            ApiRequestError,
            "Cannot process API request: Order 0 failed: Order was never placed, already canceled, or filled.",
        );
    });

    await t.step("ErrorResponse", async () => {
        await assertRejects(
            () => walletClient.scheduleCancel({ time: 1 }),
            ApiRequestError,
            "Cannot process API request: Scheduled cancel time too early, must be at least 5 seconds from now.",
        );
    });

    await t.step("OrderResponse", async () => {
        await assertRejects(
            () =>
                walletClient.order({
                    orders: [{ a: 0, b: true, p: "0", s: "0", r: false, t: { limit: { tif: "Gtc" } } }],
                    grouping: "na",
                }),
            ApiRequestError,
            "Cannot process API request: Order 0 failed: Order has zero size.",
        );
    });

    await t.step("TwapCancelResponse", async () => {
        await assertRejects(
            () => walletClient.twapOrder({ a: 0, b: true, s: "0", r: false, m: 5, t: false }),
            ApiRequestError,
            "Cannot process API request: Order has zero size.",
        );
    });

    await t.step("TwapOrderResponse", async () => {
        await assertRejects(
            () => walletClient.twapOrder({ a: 0, b: true, s: "0", r: false, m: 5, t: false }),
            ApiRequestError,
            "Cannot process API request: Order has zero size.",
        );
    });
});
