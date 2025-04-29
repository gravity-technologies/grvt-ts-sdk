import { ECurrency, ETransferType } from 'grvt';
import { GrvtClient, GrvtEnvironment } from '../src';

const fundingAccountID = '';
const tradingAccountId1 = '';

async function testGetFundingAccountSummary(client: GrvtClient) {
  try {
    // Test getAccountSummary
    console.log('Fetching account summary...');
    const accountSummary = await client.getFundingAccountSummary();
    console.log('Account Summary:', accountSummary);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function testGetSubAccountSummary(client: GrvtClient, tradingAccountId: string) {
  try {
    // Test getSubAccountSummary
    console.log(`Fetching sub account summary of trading account ${tradingAccountId}...`);
    const subAccountSummary = await client.getSubAccountSummary({ sub_account_id: tradingAccountId });
    console.log(`Sub Account Summary of trading account ${tradingAccountId}:`, subAccountSummary);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function testGetTransferHistory(client: GrvtClient, fundingAccountId: string) {
  try {
    // Test getSubAccountHistory
    console.log(`Fetching transfer history of funding account id ${fundingAccountId}...`);
    const history = await client.getTransferHistory({});
    console.log(`Transfer History of funding account ${fundingAccountId}:`, history);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Transfer from funding account to recipient funding account
async function testTransfer(client: GrvtClient) {
  const recipientAccountId = '';
  const transfer = await client.transfer({
    from_account_id: fundingAccountID,
    from_sub_account_id: '0',
    to_account_id: recipientAccountId,
    to_sub_account_id: '0',
    currency: ECurrency.USD,
    num_tokens: '1.23',
    transfer_type: ETransferType.STANDARD,
    transfer_metadata: '',
  });

  console.log('Transfer result:', JSON.stringify(transfer, null, 2));
}

async function main() {
  // Load environment variables
  const apiKey = {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
  };
  const env = GrvtEnvironment.DEV;

  if (!apiKey.apiKey || !apiKey.apiSecret) {
    console.error('Please set GRVT_API_KEY and GRVT_API_SECRET environment variables');
    process.exit(1);
  }

  // Initialize the client
  const client = new GrvtClient({
    apiKey: apiKey.apiKey,
    apiSecret: apiKey.apiSecret,
    tradingAccountId: tradingAccountId1,
    env
  });

  await testGetFundingAccountSummary(client);
  await testGetSubAccountSummary(client, tradingAccountId1);
  await testGetTransferHistory(client, fundingAccountID);
  await testTransfer(client);
}

main().catch(console.error); 