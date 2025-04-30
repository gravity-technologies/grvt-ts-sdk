import { EChain } from './chain';

export interface IApiDepositApprovalRequest {
  l1Sender: string;
  l2Receiver: string;
  l1Token: string;
  amount: string;
}

export interface IDepositSignature {
  l1Sender: string;
  l2Receiver: string;
  l1Token: string;
  amount: string;
  deadline: string;
  v: number;
  r: string;
  s: string;
}

export interface IDepositApprovalResponse {
  signature: IDepositSignature;
}

export interface IDepositContractConfig {
  l1TokenAddress: string;
  l1BridgeAddress: string;
  l1BridgeAbi: any[];
  l1TokenAbi: any[];
  chainId: number;
  rpcUrl: string;
}

export interface IDepositOptions {
  privateKey: string;
  l1Sender: string;
  l2Receiver: string;
  amount: string;
  chainId: EChain;
}
