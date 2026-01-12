import {
  IApiDepositHistoryResponse,
  IApiTransferHistoryResponse,
  IApiWithdrawalHistoryResponse,
} from '@grvt/client/interfaces';
import { sanitizeEvmAddress, sanitizeTransactionHash } from '../utils/address';

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
      l_1_hash: sanitizeNullableTransactionHash(deposit.l_1_hash),
      l_2_hash: sanitizeNullableTransactionHash(deposit.l_2_hash),
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
      l_1_hash: sanitizeNullableTransactionHash(withdrawal.l_1_hash),
      l_2_hash: sanitizeNullableTransactionHash(withdrawal.l_2_hash),
    })),
  };
}

function sanitizeNullableAddress(address: string | undefined): string | undefined {
  return address ? sanitizeEvmAddress(address) : undefined;
}

function sanitizeNullableTransactionHash(transactionHash: string | undefined): string | undefined {
  return transactionHash ? sanitizeTransactionHash(transactionHash) : undefined;
}
