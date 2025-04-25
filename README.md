# GRVT TypeScript SDK

A TypeScript SDK for interacting with the GRVT API.

## Installation

```bash
npm install grt-ts-sdk
```

## Usage

```typescript
import { GrvtClient } from 'grt-ts-sdk';

// Initialize the client
const client = new GrvtClient({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  testnet: true // Set to false for production
});

// Example: Check API health
async function checkHealth() {
  const response = await client.getHealth();
  if (response.success) {
    console.log('API Status:', response.data?.status);
  } else {
    console.error('Error:', response.error);
  }
}
```

## Features

- TypeScript support with full type definitions
- Promise-based API
- Error handling
- Support for both mainnet and testnet
- Automatic request signing
- WebSocket support (coming soon)

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## License

MIT 