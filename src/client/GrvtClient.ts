import { signTransfer } from '../signing/transfer';
import { GrvtConfig } from '../config/config';
import { GrvtBaseClient } from './GrvtBaseClient';
import { AxiosRequestConfig, AxiosHeaders } from 'axios';
import { TDG, MDG } from 'grvt';
import { Wallet } from 'ethers';
import {
  IApiSubAccountSummaryResponse,
  IApiFundingAccountSummaryResponse,
  IApiTransferHistoryRequest,
  IApiTransferHistoryResponse,
  IApiSubAccountSummaryRequest,
  IApiTransferRequest,
} from 'grvt';
import { IApiRequestNativeDepositApprovalRequest, IApiRequestNativeDepositApprovalResponse } from '../types/deposit';
import { ITransferMetadata } from '../types/transfer';

export class GrvtClient extends GrvtBaseClient {
  protected tdgClient: TDG;
  protected mdgClient: MDG;
  protected wallet?: Wallet;
  protected tradesBaseUrl: string;
  protected marketDataBaseUrl: string;

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
   * Transfer funds between accounts
   * @param request - Transfer request
   * @returns Promise with transfer response
   */
  async transfer(request: IApiTransferRequest, metadata?: ITransferMetadata): Promise<{ acknowledgement: boolean }> {
    if (!this.wallet) {
      throw new Error('API secret is required for transfer');
    }
    if (metadata) {
      request.transfer_metadata = JSON.stringify(metadata);
    }
    const signedTransfer = await signTransfer(request, this.wallet, this.config.env);
    const config = await this.authenticatedEndpoint();
    return this.tdgClient.transfer(signedTransfer, config);
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

  async RequestNativeDepositApproval(request: IApiRequestNativeDepositApprovalRequest): Promise<IApiRequestNativeDepositApprovalResponse> {
    return this.authenticatedPost(this.edgeBaseUrl + '/api/v1/deposit-approval', request);
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
