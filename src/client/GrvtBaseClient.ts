import { GrvtConfig, GrvtEnvironment } from '../types';
import { getCookieWithExpiration } from '../utils/cookie';
import { GrvtError } from '../types/error';
import { TDG, MDG } from 'grvt';
import { AxiosRequestConfig, AxiosHeaders } from 'axios';
interface GrvtCookie {
  gravity: string;
  expires: number;
  XGrvtAccountId?: string;
}

interface ApiResponseWithCode {
  code?: number;
  message?: string;
  status?: number;
}

export class GrvtBaseClient {
  protected config: GrvtConfig;
  protected cookie: GrvtCookie | null = null;
  protected edgeBaseUrl: string;
  protected tradesBaseUrl: string;
  protected marketDataBaseUrl: string;
  protected TDG: TDG;
  protected MDG: MDG;

  constructor(config: GrvtConfig) {
    this.config = config;
    const domain = this.getDomain();
    this.edgeBaseUrl = `https://edge.${domain}`;
    this.tradesBaseUrl = `https://trades.${domain}`;
    this.marketDataBaseUrl = `https://market-data.${domain}`;
    this.TDG = new TDG({
      host: this.tradesBaseUrl,
    });
    this.MDG = new MDG({
      host: this.marketDataBaseUrl,
    });
    if (!this.TDG.axios || !this.MDG.axios) {
      throw new Error('Failed to initialize TDG or MDG');
    }
  }

  protected async authenticatedEndpoint(): Promise<AxiosRequestConfig> {
    await this.refreshCookie();
    return this.getAxiosConfig()
  }

  private getAxiosConfig(): AxiosRequestConfig {
    let headers = new AxiosHeaders();
    headers = headers.set('Content-Type', 'application/json');

    if (this.cookie?.gravity) {
      headers = headers.set('Cookie', `gravity=${this.cookie.gravity}`);
    }
    if (this.cookie?.XGrvtAccountId) {
      headers = headers.set('X-Grvt-Account-Id', this.cookie.XGrvtAccountId);
    }

    return {
      headers,
    };
  }

  protected shouldRefreshCookie(): boolean {
    if (!this.config.apiKey) {
      return false;
    }

    const timeTillExpiration = this.cookie ? this.cookie.expires - Date.now() / 1000 : null;
    const isCookieFresh = timeTillExpiration !== null && timeTillExpiration > 5;

    if (!isCookieFresh) {
      console.info(
        `Cookie should be refreshed, time till expiration: ${timeTillExpiration} seconds`
      );
    }

    return !isCookieFresh;
  }

  protected async refreshCookie(): Promise<GrvtCookie | null> {
    if (!this.shouldRefreshCookie()) {
      return this.cookie;
    }

    const path = this.edgeBaseUrl + '/auth/api_key/login';
    this.cookie = await getCookieWithExpiration(path, this.config.apiKey || null);

    if (this.cookie) {
      console.info('Cookie refreshed');
    }

    return this.cookie;
  }

  private getDomain(): string {
    switch (this.config.env) {
      case GrvtEnvironment.PRODUCTION:
        return 'grvt.io';
      case GrvtEnvironment.TESTNET:
        return 'testnet.grvt.io';
      case GrvtEnvironment.STAGING:
        return 'staging.gravitymarkets.io';
      case GrvtEnvironment.DEV:
        return 'dev.gravitymarkets.io';
      default:
        throw new Error(`Unknown environment: ${this.config.env}`);
    }
  }
}
