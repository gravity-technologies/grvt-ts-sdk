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
  chainid: string;
  endpoint: string;
  provider_tx_id?: string;
  provider_ref_id?: string;
}
