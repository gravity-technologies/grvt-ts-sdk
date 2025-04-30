export enum EGrvtEnvironment {
  PRODUCTION = 'PRODUCTION',
  TESTNET = 'TESTNET',
  STAGING = 'STAGING',
  DEV = 'DEV',
}

export interface IGrvtConfig {
  apiKey?: string;
  apiSecret?: string;
  tradingAccountId?: string;
  env: EGrvtEnvironment;
}

export const CHAIN_IDS: Record<EGrvtEnvironment, number> = {
  [EGrvtEnvironment.DEV]: 327,
  [EGrvtEnvironment.STAGING]: 327,
  [EGrvtEnvironment.TESTNET]: 326,
  [EGrvtEnvironment.PRODUCTION]: 325,
};
