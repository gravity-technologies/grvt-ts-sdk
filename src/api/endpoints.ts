import { GrvtEndpointVersion, GrvtEnvironment } from '../types';

export class GrvtEndpoints {
  private readonly env: GrvtEnvironment;
  private readonly endpointVersion: GrvtEndpointVersion;
  private readonly domain: string;
  private readonly edgeBaseUrl: string;
  private readonly tradesBaseUrl: string;
  private readonly marketDataBaseUrl: string;

  constructor(env: GrvtEnvironment, endpointVersion: GrvtEndpointVersion) {
    this.env = env;
    this.endpointVersion = endpointVersion;
    this.domain = this.getDomain();
    this.edgeBaseUrl = `https://edge.${this.domain}`;
    this.tradesBaseUrl = `https://trades.${this.domain}`;
    this.marketDataBaseUrl = `https://market-data.${this.domain}`;
  }

  private getDomain(): string {
    switch (this.env) {
      case GrvtEnvironment.PRODUCTION:
        return 'grvt.io';
      case GrvtEnvironment.TESTNET:
        return 'testnet.grvt.io';
      case GrvtEnvironment.STAGING:
        return 'staging.gravitymarkets.io';
      case GrvtEnvironment.DEV:
        return 'dev.gravitymarkets.io';
      default:
        throw new Error(`Unknown environment: ${this.env}`);
    }
  }

  // Edge Endpoints
  get graphql(): string {
    return `${this.edgeBaseUrl}/query`;
  }
  get auth(): string {
    return `${this.edgeBaseUrl}/auth/api_key/login`;
  }

  // Market Data Endpoints
  get getAllInstruments(): string {
    return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/all_instruments`;
  }
  get getInstruments(): string {
    return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/instruments`;
  }
  get getInstrument(): string {
    return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/instrument`;
  }
  get getTicker(): string {
    return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/ticker`;
  }
  get getMiniTicker(): string {
    return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/mini`;
  }
  get getOrderBook(): string {
    return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/book`;
  }
  get getTrades(): string {
    return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/trade`;
  }
  get getTradeHistory(): string {
    return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/trade_history`;
  }
  get getFunding(): string {
    return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/funding`;
  }
  get getCandlestick(): string {
    return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/kline`;
  }

  // Trade Data Endpoints
  get createOrder(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/create_order`;
  }
  get cancelAllOrders(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/cancel_all_orders`;
  }
  get cancelOrder(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/cancel_order`;
  }
  get getOpenOrders(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/open_orders`;
  }
  get getAccountSummary(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/account_summary`;
  }
  get getFundingAccountSummary(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/funding_account_summary`;
  }
  get getAggregatedAccountSummary(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/aggregated_account_summary`;
  }
  get getAccountHistory(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/account_history`;
  }
  get getPositions(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/positions`;
  }
  get getOrder(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/order`;
  }
  get getOrderHistory(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/order_history`;
  }
  get getFillHistory(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/fill_history`;
  }
  get transfer(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/transfer`;
  }
  get transferHistory(): string {
    return `${this.tradesBaseUrl}/full/${this.endpointVersion}/transfer_history`;
  }

  // WebSocket Endpoints
  get wsMarketData(): string {
    return `wss://market-data.${this.domain}/ws`;
  }
  get wsTradeData(): string {
    return `wss://trades.${this.domain}/ws`;
  }
  get wsMarketDataFull(): string {
    return `wss://market-data.${this.domain}/ws/full`;
  }
  get wsTradeDataFull(): string {
    return `wss://trades.${this.domain}/ws/full`;
  }
}
