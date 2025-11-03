import { EChain } from './chain';

export interface IKYACheckRhinoSDADepositRequest {
  sender_address: string;
  chain_id: EChain;
  smart_deposit_address: string;
}

export enum EKYACheckStatus {
  CLEARED = 'CLEAN',
  DIRTY = 'DIRTY',
}

export interface IKYACheckRhinoSDADepositResponse {
  status: EKYACheckStatus;
}
