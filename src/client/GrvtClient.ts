import { GrvtConfig } from '../types';
import { GrvtBaseClient } from './GrvtBaseClient';
import { ApiSubAccountSummaryResponse, ApiFundingAccountSummaryResponse, ApiSubAccountSummaryRequest } from '../types/account';

export class GrvtClient extends GrvtBaseClient {
  constructor(config: GrvtConfig) {
    super(config);
  }

  /**
   * Get funding account summary
   * @returns Promise with funding account summary data
   */
  async getFundingAccountSummary(): Promise<ApiFundingAccountSummaryResponse> {
    return this.authenticatedPost<{}, ApiFundingAccountSummaryResponse>(this.endpoints.getFundingAccountSummary, {});
  }

  /**
   * Get sub account summary
   * @returns Promise with sub account summary data
   */
  async getSubAccountSummary(tradingAccountId: string): Promise<ApiSubAccountSummaryResponse> {
    return this.authenticatedPost<ApiSubAccountSummaryRequest, ApiSubAccountSummaryResponse>(this.endpoints.getAccountSummary, { sub_account_id: tradingAccountId });
  }
} 