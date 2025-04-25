import { GrvtConfig } from '../types';
import { GrvtBaseClient } from './GrvtBaseClient';
import { ApiSubAccountSummaryResponse } from '../types/account';

export class GrvtClient extends GrvtBaseClient {
  constructor(config: GrvtConfig) {
    super(config);
  }

  /**
   * Get account summary for the trading account
   * @returns Promise with account summary data
   */
  async getAccountSummary(): Promise<ApiSubAccountSummaryResponse> {
    this.checkAccountAuth();
    return this.authenticatedGet<{}, ApiSubAccountSummaryResponse>(this.endpoints.getAccountSummary);
  }
} 