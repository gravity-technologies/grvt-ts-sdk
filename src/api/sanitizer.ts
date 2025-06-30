import { IApiTransferHistoryResponse } from '@grvt/client';
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

function sanitizeNullableAddress(address: string | undefined): string | undefined {
  return address ? sanitizeEvmAddress(address) : undefined;
}
