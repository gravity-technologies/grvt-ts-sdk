import { GrvtWsClient } from '../src/client/GrvtWsClient';
import { EGrvtEnvironment } from '../src/config/config';

async function testTransferHistorySubscription() {
  const fundingAccountId = '';
  const subAccountId = '';

  const client = new GrvtWsClient({
    apiKey: process.env.API_KEY || '',
    env: EGrvtEnvironment.DEV,
  });

  try {
    await client.connect();
    console.log('Connected to WebSocket');

    // Subscribe to transfer history for main account
    client.subscribeTransferHistory(
      fundingAccountId,
      (data: any) => {
        console.log('Received transfer history update:', data);
      }
    );

    // Optionally subscribe to transfer history for a specific sub-account
    if (subAccountId) {
      client.subscribeTransferHistory(
        fundingAccountId,
        (data: any) => {
          console.log('Received sub-account transfer history update:', JSON.stringify(data, null, 2));
        },
        subAccountId
      );
    }

    // Keep the connection alive for a while to receive updates
    await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000)); // 5 minutes
  } catch (error) {
    console.error('Error:', error);
  } finally {
    client.disconnect();
  }
}

testTransferHistorySubscription().catch(console.error); 