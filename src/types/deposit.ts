export interface IApiDepositApprovalRequest {
  l1Sender: string;
  l2Receiver: string;
  l1Token: string;
  amount: string
}

export interface IDepositSignature {
  l1Sender: string;
  l2Receiver: string;
  l1Token: string;
  amount: string;
  deadline: number;
  v: number;
  r: string;
  s: string;
}

export interface IDepositApprovalResponse {
  signature: IDepositSignature;
}

export interface IDepositRequest {
}
