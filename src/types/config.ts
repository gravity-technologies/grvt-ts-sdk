export enum GrvtEnvironment {
  PRODUCTION = 'PRODUCTION',
  TESTNET = 'TESTNET',
  STAGING = 'STAGING',
  DEV = 'DEV',
}

export interface GrvtConfig {
  apiKey?: string;
  apiSecret?: string;
  tradingAccountId?: string;
  env: GrvtEnvironment;
}

export const CHAIN_IDS: Record<GrvtEnvironment, number> = {
  [GrvtEnvironment.DEV]: 327,
  [GrvtEnvironment.STAGING]: 327,
  [GrvtEnvironment.TESTNET]: 326,
  [GrvtEnvironment.PRODUCTION]: 325,
};
