export enum Currency {
  USD = 'USD',
  USDC = 'USDC',
  USDT = 'USDT',
  ETH = 'ETH',
  BTC = 'BTC',
  SOL = 'SOL',
  ARB = 'ARB',
  BNB = 'BNB',
  ZK = 'ZK',
  POL = 'POL',
  OP = 'OP',
  ATOM = 'ATOM',
  KPEPE = 'KPEPE',
  TON = 'TON',
  XRP = 'XRP',
  XLM = 'XLM',
  WLD = 'WLD',
  WIF = 'WIF',
  VIRTUAL = 'VIRTUAL',
  TRUMP = 'TRUMP',
  SUI = 'SUI',
  KSHIB = 'KSHIB',
  POPCAT = 'POPCAT',
  PENGU = 'PENGU',
  LINK = 'LINK',
  KBONK = 'KBONK',
  JUP = 'JUP',
  FARTCOIN = 'FARTCOIN',
  ENA = 'ENA',
  DOGE = 'DOGE',
  AIXBT = 'AIXBT',
  AI16Z = 'AI16Z',
  ADA = 'ADA',
  AAVE = 'AAVE',
  BERA = 'BERA',
  VINE = 'VINE',
  PENDLE = 'PENDLE',
  UXLINK = 'UXLINK',
  KAITO = 'KAITO',
  IP = 'IP'
}

export enum MarginType {
  SIMPLE_CROSS_MARGIN = 'SIMPLE_CROSS_MARGIN',
  PORTFOLIO_CROSS_MARGIN = 'PORTFOLIO_CROSS_MARGIN'
}

export enum GrvtEnvironment {
  PRODUCTION = 'PRODUCTION',
  TESTNET = 'TESTNET',
  STAGING = 'STAGING',
  DEV = 'DEV'
}

export enum GrvtEndpointVersion {
  V1 = 'v1'
}

export interface GrvtConfig {
  apiKey?: string;
  apiSecret?: string;
  tradingAccountId?: string;
  endpointVersion?: GrvtEndpointVersion;
  env: GrvtEnvironment;
}

// Add more type definitions as needed 