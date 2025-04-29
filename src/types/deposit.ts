export interface IApiRequestNativeDepositApprovalRequest {
  l1Sender: string;
  l2Receiver: string;
  l1Token: string;
  amount: string
}

export interface RequestNativeRepositSignature {
  l1Sender: string;
  l2Receiver: string;
  l1Token: string;
  amount: string;
  deadline: number;
  v: number;
  r: string;
  s: string;
}

export interface IApiRequestNativeDepositApprovalResponse {
  signature: RequestNativeRepositSignature;
}
