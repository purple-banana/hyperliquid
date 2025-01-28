import * as tsj from "npm:ts-json-schema-generator@^2.3.0";
import { privateKeyToAccount } from "npm:viem@^2.21.7/accounts";
import { assertJsonSchema, isHex } from "../../utils.ts";
import { HttpTransport, WalletClient } from "../../../mod.ts";

// —————————— Constants ——————————

const TEST_PRIVATE_KEY = Deno.args[0] as string | undefined;
const TEST_VAULT_ADDRESS = Deno.args[3] as string | undefined;

if (!isHex(TEST_PRIVATE_KEY)) {
    throw new Error(`Expected a hex string, but got ${typeof TEST_PRIVATE_KEY}`);
}
if (!isHex(TEST_VAULT_ADDRESS)) {
    throw new Error(`Expected a hex string, but got ${typeof TEST_VAULT_ADDRESS}`);
}

// —————————— Type schema ——————————

export type MethodReturnType = ReturnType<WalletClient["vaultTransfer"]>;
const MethodReturnType = tsj
    .createGenerator({ path: import.meta.url, skipTypeCheck: true })
    .createSchema("MethodReturnType");

// —————————— Test ——————————

Deno.test("vaultTransfer", async (t) => {
    // —————————— Prepare ——————————

    const account = privateKeyToAccount(TEST_PRIVATE_KEY);
    const transport = new HttpTransport({ url: "https://api.hyperliquid-testnet.xyz" });
    const walletClient = new WalletClient({ wallet: account, transport, isTestnet: true });

    // —————————— Test ——————————

    await t.step("withdraw from vault", async () => {
        const result = await walletClient.vaultTransfer({
            vaultAddress: TEST_VAULT_ADDRESS,
            isDeposit: false,
            usd: 5000000, // 5 USD minimum
        });

        assertJsonSchema(MethodReturnType, result);
    });

    await t.step("deposit to vault", async () => {
        const result = await walletClient.vaultTransfer({
            vaultAddress: TEST_VAULT_ADDRESS,
            isDeposit: true,
            usd: 5000000, // 5 USD minimum
        });
        assertJsonSchema(MethodReturnType, result);
    });
});
