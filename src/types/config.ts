export enum GrvtEnvironment {
  PRODUCTION = 'PRODUCTION',
  TESTNET = 'TESTNET',
  STAGING = 'STAGING',
  DEV = 'DEV',
}

export enum GrvtEndpointVersion {
  V1 = 'v1',
}

export interface GrvtConfig {
  apiKey?: string;
  apiSecret?: string;
  tradingAccountId?: string;
  endpointVersion?: GrvtEndpointVersion;
  env: GrvtEnvironment;
}

export const CHAIN_IDS: Record<GrvtEnvironment, number> = {
  [GrvtEnvironment.DEV]: 327,
  [GrvtEnvironment.STAGING]: 327,
  [GrvtEnvironment.TESTNET]: 326,
  [GrvtEnvironment.PRODUCTION]: 325,
};

export const getEIP712DomainData = (env: GrvtEnvironment, chainId?: number): { name: string; version: string; chainId: number } => {
  return {
    name: 'GRVT Exchange',
    version: '0',
    chainId: chainId || CHAIN_IDS[env],
  };
};
