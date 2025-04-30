# GRVT TypeScript SDK

This SDK provides a TypeScript interface to interact with the GRVT API. It supports both REST API and WebSocket connections.

## Installation

The GRVT TypeScript SDK consists of two packages:

- `@grvt/sdk`: TypeScript implementation of the GRVT API

Install both packages to get started:

```bash
npm install @grvt/sdk
```

## Usage

### REST API Client

```typescript
import { ECurrency, ETransferType, ITransferMetadata, ETransferProvider, ETransferDirection } from '@grvt/client';

// Initialize the client
const client = new GrvtClient({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  env: GrvtEnvironment.DEV,
});

// Get funding account summary
const accountSummary = await client.getFundingAccountSummary();

// Get sub account summary
const subAccountSummary = await client.getSubAccountSummary({
  sub_account_id: 'your-sub-account-id',
});

// Transfer examples
// Note: The signature field is optional. If not provided, the SDK will automatically compute it using the apiSecret.

// Standard transfer
const transfer1 = await client.transfer({
  from_account_id: 'from-account-id',
  from_sub_account_id: 'from-sub-account-id',
  to_account_id: 'to-account-id',
  to_sub_account_id: 'to-sub-account-id',
  currency: ECurrency.USDT,
  num_tokens: '100',
  transfer_type: ETransferType.STANDARD,
});


// Transfer for deposit/withdrawal workflow. You can pass the metadata as the second argument
// Note: The signature field is optional. If not provided, the SDK will automatically compute it using the apiSecret.
const metadata: ITransferMetadata = {
  provider: ETransferProvider.rhino;
  direction: ETransferDirection.DEPOSIT; // Use ETransferDirection.WITHDRAWAL for withdraw flow
  chainid,
  endpoint,
  provider_tx_id: tx_hash,
  provider_ref_id: commit_id,
};

const transfer2 = await client.transfer(
  {
    from_account_id: 'from-account-id',
    to_account_id: 'to-account-id',
    currency: ECurrency.USDT,
    num_tokens: '100',
    transfer_type: ETransferType.NON_NATIVE_BRIDGE_DEPOSIT, // Use NON_NATIVE_BRIDGE_WITHDRAW for withdraw flow
  },
  metadata
);

// Request deposit approval
// This API is used to get signature for a deposit before executing it
const depositApproval = await client.requestDepositApproval({
  l1Sender: 'your-l1-address', // L1 address of the sending wallet
  l2Receiver: 'your-l2-address', // Your L2 address to receive the funds
  l1Token: 'token-contract-address', // L1 token contract address
  amount: '100' // Amount to deposit
});


// Withdraw funds from your account
// Note: For withdrawals, the signature is automatically computed by the SDK using the apiSecret.
const withdrawResult = await client.withdrawal({
  from_account_id: 'your-account-id',
  to_eth_address: 'destination-eth-address',
  currency: ECurrency.USDT,
  num_tokens: '100'
});

// Query transfer history
const transferHistory = await client.getTransferHistory({
  start_time: '1745600642000785050' // timestamp in nanosecond, use this to get all transfers with event time >= start_time
});
// You can filter more & do pagination with this query if needed, please take a look at the request interface to get more details


```

### WebSocket Client

The WebSocket client supports real-time data streaming and follows the same authentication mechanism as the REST API client.

```typescript
import { GrvtWsClient, GrvtEnvironment } from '@grvt/sdk';

// Initialize the WebSocket client
const client = new GrvtWsClient({
  apiKey: 'your-api-key',
  env: GrvtEnvironment.DEV,
});

// Connect to WebSocket
await client.connect();

// Subscribe to transfer history
client.subscribeTransferHistory(
  'main-account-id',
  (data) => {
    console.log('Received transfer:', data);
  },
  'sub-account-id' // optional
);

// Disconnect when done
client.disconnect();
```

#### WebSocket Features

1. **Authentication**:
   - Uses the same cookie-based authentication as the REST API
   - Automatically refreshes cookies when needed

2. **Connection Management**:
   - Automatic reconnection with exponential backoff
   - Connection monitoring with 5-second timeout
   - Reconnects if no messages are received within the timeout period

3. **Subscription Handling**:
   - Unique subscription IDs for each subscription
   - Subscriptions are not automatically restored after reconnection
   - Users need to manually resubscribe after reconnection

4. **Error Handling**:
   - Automatic error logging
   - Graceful disconnection handling
   - Reconnection attempts with configurable maximum retries

## Development

### Building

```bash
npm run build
```

### Formatting

```bash
npm run format
```

### Testing

```bash
# Run all tests
npm test

# Run SDK tests
npm run test:sdk

# Run WebSocket tests
npm run test:ws
```

### Linting and Formating

```bash
npm run lint
```

```bash
npm run format
```

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
