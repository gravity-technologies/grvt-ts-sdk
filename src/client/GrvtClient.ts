import { signTransfer } from '../signing/transfer';
import { ApiTransferRequest } from '../types';
import { GrvtConfig } from '../types/config';
import { GrvtBaseClient } from './GrvtBaseClient';
import {
  IApiSubAccountSummaryResponse,
  IApiFundingAccountSummaryResponse,
  IApiTransferHistoryRequest,
  IApiTransferHistoryResponse,
  IApiSubAccountSummaryRequest,
  IApiTransferRequest,
  ECurrency,
  ETransferType,
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
   * @returns Promise with transfer response
   */
  // TODO: use codegen interface once the type is updated
  async transfer(request: ApiTransferRequest): Promise<{ acknowledgement: boolean }> {
    if (!this.wallet) {
      throw new Error('API secret is required for transfer');
    }

    const signedTransfer = await signTransfer(request, this.wallet, this.config.env);
    // TODO: remove later once the type is updated
    const payload = {
      from_account_id: BigInt(signedTransfer.from_account_id),
      from_sub_account_id: BigInt(signedTransfer.from_sub_account_id),
      to_account_id: BigInt(signedTransfer.to_account_id),
      to_sub_account_id: BigInt(signedTransfer.to_sub_account_id),
      currency: signedTransfer.currency as unknown as ECurrency,
      num_tokens: signedTransfer.num_tokens,
      transfer_type: signedTransfer.transfer_type as unknown as ETransferType,
      transfer_metadata: signedTransfer.transfer_metadata,
      signature: signedTransfer.signature,
    } as IApiTransferRequest;

    const config = await this.authenticatedEndpoint();
    return this.tdgClient.transfer(payload, config);
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
}
