import { GrvtEndpointVersion, GrvtEnvironment } from ".";

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
  get graphql() { return `${this.edgeBaseUrl}/query`; }
  get auth() { return `${this.edgeBaseUrl}/auth/api_key/login`; }

  // Market Data Endpoints
  get getAllInstruments() { return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/all_instruments`; }
  get getInstruments() { return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/instruments`; }
  get getInstrument() { return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/instrument`; }
  get getTicker() { return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/ticker`; }
  get getMiniTicker() { return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/mini`; }
  get getOrderBook() { return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/book`; }
  get getTrades() { return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/trade`; }
  get getTradeHistory() { return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/trade_history`; }
  get getFunding() { return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/funding`; }
  get getCandlestick() { return `${this.marketDataBaseUrl}/full/${this.endpointVersion}/kline`; }

  // Trade Data Endpoints
  get createOrder() { return `${this.tradesBaseUrl}/full/${this.endpointVersion}/create_order`; }
  get cancelAllOrders() { return `${this.tradesBaseUrl}/full/${this.endpointVersion}/cancel_all_orders`; }
  get cancelOrder() { return `${this.tradesBaseUrl}/full/${this.endpointVersion}/cancel_order`; }
  get getOpenOrders() { return `${this.tradesBaseUrl}/full/${this.endpointVersion}/open_orders`; }
  get getAccountSummary() { return `${this.tradesBaseUrl}/full/${this.endpointVersion}/account_summary`; }
  get getFundingAccountSummary() { return `${this.tradesBaseUrl}/full/${this.endpointVersion}/funding_account_summary`; }
  get getAggregatedAccountSummary() { return `${this.tradesBaseUrl}/full/${this.endpointVersion}/aggregated_account_summary`; }
  get getAccountHistory() { return `${this.tradesBaseUrl}/full/${this.endpointVersion}/account_history`; }
  get getPositions() { return `${this.tradesBaseUrl}/full/${this.endpointVersion}/positions`; }
  get getOrder() { return `${this.tradesBaseUrl}/full/${this.endpointVersion}/order`; }
  get getOrderHistory() { return `${this.tradesBaseUrl}/full/${this.endpointVersion}/order_history`; }
  get getFillHistory() { return `${this.tradesBaseUrl}/full/${this.endpointVersion}/fill_history`; }

  // WebSocket Endpoints
  get wsMarketData() { return `wss://market-data.${this.domain}/ws`; }
  get wsTradeData() { return `wss://trades.${this.domain}/ws`; }
  get wsMarketDataFull() { return `wss://market-data.${this.domain}/ws/full`; }
  get wsTradeDataFull() { return `wss://trades.${this.domain}/ws/full`; }
} 