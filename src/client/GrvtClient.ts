import { GrvtConfig } from '../types/config';
import { GrvtBaseClient } from './GrvtBaseClient';
import {
  IApiSubAccountSummaryResponse,
  IApiFundingAccountSummaryResponse,
  IApiTransferHistoryRequest,
  IApiTransferHistoryResponse,
  IApiSubAccountSummaryRequest
} from 'grvt';

export class GrvtClient extends GrvtBaseClient {
  constructor(config: GrvtConfig) {
    super(config);
  }

  /**
   * Get funding account summary
   * @returns Promise with funding account summary data
   */
  async getFundingAccountSummary(): Promise<IApiFundingAccountSummaryResponse> {
    const config = await this.authenticatedEndpoint();
    return this.TDG.fundingAccountSummary(config);
  }

  /**
   * Get sub account summary
   * @returns Promise with sub account summary data
   */
  async getSubAccountSummary(request: IApiSubAccountSummaryRequest): Promise<IApiSubAccountSummaryResponse> {
    const config = await this.authenticatedEndpoint();
    return this.TDG.subAccountSummary(request, config);
  }

  /**
   * Transfer funds between accounts
   * @returns Promise with transfer response
   */
  // async transfer(request: IApiTransferRequest): Promise<{ result: string }> {
  //   if (!this.config.apiSecret) {
  //     throw new Error('API secret is required for transfer');
  //   }

  //   const signedTransfer = await signTransfer(request, this.config.apiSecret, this.config.env);
  //   return this.authenticatedPostWrapper(
  //     this.TDG.transfer,
  //     signedTransfer
  //   );
  // }

  /**
   * Get transfer history
   * @returns Promise with transfer history response
   */
  async getTransferHistory(
    request: IApiTransferHistoryRequest
  ): Promise<IApiTransferHistoryResponse> {
    const config = await this.authenticatedEndpoint();
    return this.TDG.transferHistory(request, config);
  }
}
