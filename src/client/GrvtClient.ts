import { signTransfer } from '../signing/transfer';
import { GrvtConfig } from '../config/config';
import { GrvtBaseClient } from './GrvtBaseClient';
import { AxiosRequestConfig, AxiosHeaders } from 'axios';
import { TDG, MDG, IApiWithdrawalRequest } from '@grvt/client';
import { Wallet } from 'ethers';
import {
  IApiSubAccountSummaryResponse,
  IApiFundingAccountSummaryResponse,
  IApiTransferHistoryRequest,
  IApiTransferHistoryResponse,
  IApiSubAccountSummaryRequest,
  IApiTransferRequest,
} from '@grvt/client';
import { ITransferMetadata } from '../types/transfer';
import { signWithdrawal } from '../signing/withdraw';
import { DepositService } from '../services/deposit';
import {
  IDepositOptions,
  IApiDepositApprovalRequest,
  IDepositApprovalResponse,
} from '../types/deposit';

export class GrvtClient extends GrvtBaseClient {
  protected tdgClient: TDG;
  protected mdgClient: MDG;
  protected wallet?: Wallet;
  protected tradesBaseUrl: string;
  protected marketDataBaseUrl: string;
  private depositService: DepositService;

  constructor(config: GrvtConfig) {
    super(config);
    this.tradesBaseUrl = `https://trades.${this.domain}`;
    this.marketDataBaseUrl = `https://market-data.${this.domain}`;
    this.tdgClient = new TDG({
      host: this.tradesBaseUrl,
    });
    this.mdgClient = new MDG({
      host: this.marketDataBaseUrl,
    });
    if (config.apiSecret) {
      this.wallet = new Wallet(config.apiSecret);
    }
    this.depositService = new DepositService(this, config.env);
  }

  /**
   * Get funding account summary
   * @returns Promise with funding account summary data
   */
  async getFundingAccountSummary(): Promise<IApiFundingAccountSummaryResponse> {
    const config = await this.authenticatedEndpoint();
    return this.tdgClient.fundingAccountSummary(config);
  }

  /**
   * Get sub account summary
   * @returns Promise with sub account summary data
   */
  async getSubAccountSummary(
    request: IApiSubAccountSummaryRequest
  ): Promise<IApiSubAccountSummaryResponse> {
    const config = await this.authenticatedEndpoint();
    return this.tdgClient.subAccountSummary(request, config);
  }

  /**
   * Withdraw funds from the account
   * @param request - Withdrawal request
   * @returns Promise with withdrawal response
   */
  async withdrawal(request: IApiWithdrawalRequest): Promise<{ acknowledgement: boolean }> {
    const config = await this.authenticatedEndpoint();
    if (!request.signature) {
      if (!this.wallet) {
        throw new Error('signing requires API secret');
      }
      const withdrawalSignature = await signWithdrawal(request, this.wallet, this.config.env);
      request.signature = withdrawalSignature;
    }
    return this.tdgClient.withdrawal(request, config);
  }

  /**
   * Transfer funds between accounts
   * @param request - Transfer request
   * @returns Promise with transfer response
   */
  async transfer(
    request: IApiTransferRequest,
    metadata?: ITransferMetadata
  ): Promise<{ acknowledgement: boolean }> {
    if (metadata) {
      request.transfer_metadata = JSON.stringify(metadata);
    }
    if (!request.signature) {
      if (!this.wallet) {
        throw new Error('signing requires API secret');
      }
      const transferSignature = await signTransfer(request, this.wallet, this.config.env);
      request.signature = transferSignature;
    }
    const config = await this.authenticatedEndpoint();
    return this.tdgClient.transfer(request, config);
  }

  /**
   * Get transfer history
   * @returns Promise with transfer history response
   */
  async getTransferHistory(
    request: IApiTransferHistoryRequest
  ): Promise<IApiTransferHistoryResponse> {
    const config = await this.authenticatedEndpoint();
    return this.tdgClient.transferHistory(request, config);
  }

  /**
   * Deposit funds to the account using L1 bridge or direct transfer for Arbitrum
   * @param options - Deposit options
   * @returns Promise with deposit transaction hash
   */
  async deposit(options: IDepositOptions): Promise<string> {
    return this.depositService.deposit(options);
  }

  /**
   * Request deposit approval
   * @param request - Deposit approval request
   * @returns Promise with deposit approval response
   */
  async requestDepositApproval(
    request: IApiDepositApprovalRequest
  ): Promise<IDepositApprovalResponse> {
    return this.authenticatedPost<IApiDepositApprovalRequest, IDepositApprovalResponse>(
      `${this.edgeBaseUrl}/v1/deposit/approval`,
      request
    );
  }

  private async authenticatedEndpoint(): Promise<AxiosRequestConfig> {
    await this.refreshCookie();
    return this.getAxiosConfig();
  }

  private getAxiosConfig(): AxiosRequestConfig {
    let headers = new AxiosHeaders();
    headers = headers.set('Content-Type', 'application/json');

    if (this.cookie?.gravity) {
      headers = headers.set('Cookie', `gravity=${this.cookie.gravity}`);
    }
    if (this.cookie?.XGrvtAccountId) {
      headers = headers.set('X-Grvt-Account-Id', this.cookie.XGrvtAccountId);
    }

    return {
      headers,
    };
  }
}
