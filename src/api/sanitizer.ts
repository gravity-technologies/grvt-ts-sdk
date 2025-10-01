import {
  IApiDepositHistoryResponse,
  IApiTransferHistoryResponse,
  IApiWithdrawalHistoryResponse,
} from '@grvt/client';
import { sanitizeEvmAddress } from '../utils/address';

export function sanitizeTransferHistoryResponse(
  response: IApiTransferHistoryResponse
): IApiTransferHistoryResponse {
  return {
    ...response,
    result: response.result?.map((transfer) => ({
      ...transfer,
      from_account_id: sanitizeNullableAddress(transfer.from_account_id),
      to_account_id: sanitizeNullableAddress(transfer.to_account_id),
    })),
  };
}

export function sanitizeDepositHistoryResponse(
  response: IApiDepositHistoryResponse
): IApiDepositHistoryResponse {
  return {
    ...response,
    result: response.result?.map((deposit) => ({
      ...deposit,
      from_address: sanitizeNullableAddress(deposit.from_address),
      to_account_id: sanitizeNullableAddress(deposit.to_account_id),
    })),
  };
}

export function sanitizeWithdrawalHistoryResponse(
  response: IApiWithdrawalHistoryResponse
): IApiWithdrawalHistoryResponse {
  return {
    ...response,
    result: response.result?.map((withdrawal) => ({
      ...withdrawal,
      from_account_id: sanitizeNullableAddress(withdrawal.from_account_id),
      to_eth_address: sanitizeNullableAddress(withdrawal.to_eth_address),
    })),
  };
}

function sanitizeNullableAddress(address: string | undefined): string | undefined {
  return address ? sanitizeEvmAddress(address) : undefined;
}
