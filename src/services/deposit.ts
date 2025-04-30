import { Wallet, Contract, JsonRpcProvider } from 'ethers';
import { GRVTBridgeProxyAbi, USDTL1Abi } from '../contract';
import { ChainUtils } from '../utils/chain';
import { IDepositOptions } from '../types/deposit';
import { NumberUtils } from '../utils/number';
import { GrvtClient } from '../client/GrvtClient';
import { EChain } from '../types/chain';

export class DepositService {
  constructor(private client: GrvtClient) {}

  /**
   * Deposit funds to the account using L1 bridge or direct transfer for Arbitrum
   * @param options - Deposit options
   * @returns Promise with deposit transaction hash
   */
  async deposit(options: IDepositOptions): Promise<string> {
    const { l1Sender, l2Receiver, amount, chainId } = options;

    // Get RPC URL and token address based on chain
    const rpcUrl = ChainUtils.getRpcUrl(chainId);
    if (!rpcUrl) {
      throw new Error(`Unsupported chain ID: ${chainId}`);
    }

    // Create a new wallet instance for this deposit
    const provider = new JsonRpcProvider(rpcUrl);
    const wallet = new Wallet(options.privateKey, provider);

    // Get token address based on chain
    const l1TokenAddress = ChainUtils.getL1TokenAddress(chainId);
    if (!l1TokenAddress) {
      throw new Error(`Unsupported chain ID: ${chainId}`);
    }

    // Create token contract instance
    const l1TokenContract = new Contract(l1TokenAddress, USDTL1Abi, wallet);

    // Convert amount to bigint using the same approach as market
    const requestAmount = NumberUtils.numberToBigIntCurrencyUSDT(amount);

    // Handle deposit based on chain
    if (chainId === EChain.ARBITRUM_ONE || chainId === EChain.ARBITRUM_SEPOLIA) {
      // For Arbitrum: Direct USDT transfer
      const transferTx = await l1TokenContract.transfer(l2Receiver, requestAmount);
      const receipt = await transferTx.wait();
      return receipt.hash;
    } else {
      // For ETH: Bridge deposit
      const l1BridgeAddress = ChainUtils.getL1BridgeAddress();
      if (!l1BridgeAddress) {
        throw new Error('Bridge address not configured');
      }

      // Create bridge contract instance
      const l1BridgeContract = new Contract(l1BridgeAddress, GRVTBridgeProxyAbi, wallet);

      // Request deposit approval from API
      const approvalResponse = await this.client.requestDepositApproval({
        l1Sender,
        l2Receiver,
        l1Token: l1TokenAddress,
        amount: requestAmount.toString(),
      });

      // Approve token spending
      const approveTx = await l1TokenContract.approve(l1BridgeAddress, requestAmount);
      await approveTx.wait();

      // Execute deposit
      const depositTx = await l1BridgeContract.deposit(
        l1Sender,
        l2Receiver,
        l1TokenAddress,
        requestAmount,
        approvalResponse.signature.v,
        approvalResponse.signature.r,
        approvalResponse.signature.s
      );

      const receipt = await depositTx.wait();
      return receipt.hash;
    }
  }
}
