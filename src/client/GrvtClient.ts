import { GrvtConfig } from '../types/config';
import { GrvtBaseClient } from './GrvtBaseClient';
import {
  ApiSubAccountSummaryResponse,
  ApiFundingAccountSummaryResponse,
  ApiSubAccountSummaryRequest,
} from '../types/account';
import {
  ApiTransferRequest,
  ApiTransferHistoryRequest,
  ApiTransferHistoryResponse,
} from '../types/transfer';
import { signTransfer } from '../signing/transfer';
export class GrvtClient extends GrvtBaseClient {
  constructor(config: GrvtConfig) {
    super(config);
  }

  /**
   * Get funding account summary
   * @returns Promise with funding account summary data
   */
  async getFundingAccountSummary(): Promise<ApiFundingAccountSummaryResponse> {
    return this.authenticatedPost<{}, ApiFundingAccountSummaryResponse>(
      this.endpoints.getFundingAccountSummary,
      {}
    );
  }

  /**
   * Get sub account summary
   * @returns Promise with sub account summary data
   */
  async getSubAccountSummary(tradingAccountId: string): Promise<ApiSubAccountSummaryResponse> {
    return this.authenticatedPost<ApiSubAccountSummaryRequest, ApiSubAccountSummaryResponse>(
      this.endpoints.getAccountSummary,
      { sub_account_id: tradingAccountId }
    );
  }

  /**
   * Transfer funds between accounts
   * @param request Transfer request parameters
   * @returns Promise with transfer response
   */
  async transfer(request: ApiTransferRequest): Promise<{ result: string }> {
    if (!this.config.apiSecret) {
      throw new Error('API secret is required for transfer');
    }

    const signedTransfer = await signTransfer(request, this.config.apiSecret, this.config.env);
    return this.authenticatedPost<ApiTransferRequest, { result: string }>(
      this.endpoints.transfer,
      signedTransfer
    );
  }

  /**
   * Get transfer history
   * @param request Transfer history request parameters
   * @returns Promise with transfer history response
   */
  async getTransferHistory(
    request: ApiTransferHistoryRequest
  ): Promise<ApiTransferHistoryResponse> {
    return this.authenticatedPost<ApiTransferHistoryRequest, ApiTransferHistoryResponse>(
      this.endpoints.transferHistory,
      request
    );
  }
}
