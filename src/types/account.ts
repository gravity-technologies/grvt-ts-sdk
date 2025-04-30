export interface IAccountSummaryResponse {
  accountId: string;
  balance: string;
  currency: string;
}

export interface ITransferRequest {
  fromAccountId: string;
  toAccountId: string;
  amount: string;
  currency: string;
}

export interface ITransferResponse {
  transferId: string;
  status: string;
}

export interface IWithdrawRequest {
  fromAccountId: string;
  toAddress: string;
  amount: string;
  currency: string;
}

export interface IWithdrawResponse {
  withdrawId: string;
  status: string;
}
