import { EChain } from './chain';

export enum ETransferProvider {
  RHINO = 'rhino',
}

export enum ETransferDirection {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

export interface ITransferMetadata {
  provider: ETransferProvider;
  direction: ETransferDirection;
  chainid: EChain;
  endpoint: string;
  provider_tx_id?: string;
  provider_ref_id?: string;
  [key: string]: any; // allows extra properties
}
