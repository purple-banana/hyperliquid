# Hyperliquid React Native SDK

[![NPM](https://img.shields.io/npm/v/@far1s/hyperliquid?style=flat-square&color=blue)](https://www.npmjs.com/package/@far1s/hyperliquid)

React Native compatible fork of the [Hyperliquid API](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api) SDK. This fork is specifically modified to work seamlessly with React Native applications.

## Features

- 📱 **React Native Ready**: Optimized for React Native environments
- 🖋️ **Typed**: Source code is 100% TypeScript
- 🧪 **Tested**: Inherits good code coverage and type-safe API responses from the original SDK
- 📦 **Minimal dependencies**: A few small trusted dependencies
- 🔧 **Integratable**: Easy to use with React Native wallet solutions

## Installation

```bash
# npm
npm install @far1s/hyperliquid

# yarn
yarn add @far1s/hyperliquid
```

## Quick Start for React Native

```typescript
import * as hl from "@far1s/hyperliquid";

const transport = new hl.HttpTransport();
const publicClient = new hl.PublicClient({ transport });

// Example of fetching open orders
const openOrders = await publicClient.openOrders({ user: "0x..." });
```

### Using with a Wallet

```typescript
import * as hl from "@far1s/hyperliquid";

const transport = new hl.HttpTransport();
const walletClient = new hl.WalletClient({ 
    wallet: yourWalletInstance, // Your React Native wallet instance
    transport 
});

// Example order placement
const result = await walletClient.order({
    orders: [{
        a: 0, // Asset index
        b: true, // Buy order
        p: "30000", // Price
        s: "0.1", // Size
        r: false, // Not reduce-only
        t: {
            limit: {
                tif: "Gtc", // Good-til-cancelled
            },
        },
    }],
    grouping: "na", // No grouping
});
```

## React Native Specific Notes

This fork has been modified to work with React Native's JavaScript runtime. Key differences from the original SDK include:

- Compatible with React Native's networking layer
- Optimized for mobile environments
- Works with React Native wallet solutions

## Usage with React Native Wallets

You can use this SDK with various React Native wallet solutions. Here's an example with a typical React Native wallet setup:

```typescript
import * as hl from "@far1s/hyperliquid";

// Initialize your React Native wallet
// This will depend on your specific wallet implementation

const transport = new hl.HttpTransport();
const client = new hl.WalletClient({ 
    wallet: reactNativeWallet,
    transport 
});

// Use the client methods as needed
```

## Version Numbering

This fork follows the original SDK's version numbers but adds an "-rn" suffix to indicate it's the React Native variant. For example, version `0.17.2-rn` corresponds to version `0.17.2` of the original SDK.

This versioning scheme helps:
- Track compatibility with the original SDK
- Avoid version conflicts
- Clearly identify this as the React Native variant

Current version: v0.17.2-rn

## Original SDK

This is a fork of the [original Hyperliquid SDK](https://github.com/nktkas/hyperliquid), modified specifically for React Native compatibility.

## Contributing

If you find any React Native specific issues or have improvements, please feel free to open an issue or submit a pull request.

## License

MIT - see LICENSE file for details
