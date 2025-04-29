import { GrvtConfig, GrvtEnvironment } from '../config/config';
import { getCookieWithExpiration } from '../utils/cookie';

interface GrvtCookie {
  gravity: string;
  expires: number;
  XGrvtAccountId?: string;
}

export class GrvtBaseClient {
  protected config: GrvtConfig;
  protected cookie: GrvtCookie | null = null;
  protected domain: string;
  protected edgeBaseUrl: string;

  constructor(config: GrvtConfig) {
    this.config = config;
    this.domain = this.getDomain();
    this.edgeBaseUrl = `https://edge.${this.domain}`;
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
