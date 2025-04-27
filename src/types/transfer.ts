import { Currency } from './currency';
import { Signature } from './signature';

export enum TransferType {
  STANDARD = 'STANDARD',
  FAST_ARB_DEPOSIT = 'FAST_ARB_DEPOSIT',
  FAST_ARB_WITHDRAWAL = 'FAST_ARB_WITHDRAWAL',
}

export interface TransferHistory {
  tx_id: string;
  from_account_id: string;
  from_sub_account_id: string;
  to_account_id: string;
  to_sub_account_id: string;
  currency: Currency;
  num_tokens: string;
  signature: Signature;
  event_time: string;
  transfer_type: TransferType;
  transfer_metadata: string;
}

export interface ApiTransferRequest {
  from_account_id: string;
  from_sub_account_id: string;
  to_account_id: string;
  to_sub_account_id: string;
  currency: Currency;
  num_tokens: string;
  transfer_type: TransferType;
  transfer_metadata: string;
  signature?: Signature;
}

export interface ApiTransferHistoryRequest {
  currency?: Currency[];
  start_time?: string;
  end_time?: string;
  limit?: number;
  cursor?: string;
  tx_id?: string;
}

export interface ApiTransferHistoryResponse {
  result: TransferHistory[];
  next?: string;
}
