import { GrvtConfig, GrvtEndpointVersion } from '../types';
import { GrvtEndpoints } from '../api';
import { getCookieWithExpiration } from '../utils/cookie';
import { GrvtError } from '../types/error';

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
  protected endpoints: GrvtEndpoints;
  protected markets: Record<string, any> | null = null;
  protected cookie: GrvtCookie | null = null;
  protected pathReturnValueMap: Record<string, any> = {};

  constructor(config: GrvtConfig) {
    this.config = config;
    this.endpoints = new GrvtEndpoints(
      config.env,
      config.endpointVersion || GrvtEndpointVersion.V1
    );
  }

  protected async authenticatedGet<RequestParams = Record<string, any>, ResponseData = any>(
    endpoint: string,
    params?: RequestParams
  ): Promise<ResponseData> {
    try {
      await this.refreshCookie();
      const url = new URL(endpoint);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));
        });
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getHeaders(),
      });

      const data = await this.handleResponse<ResponseData>(response);
      this.pathReturnValueMap[endpoint] = data;
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  protected async authenticatedPost<RequestData = Record<string, any>, ResponseData = any>(
    endpoint: string,
    payload: RequestData
  ): Promise<ResponseData> {
    try {
      await this.refreshCookie();
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await this.handleResponse<ResponseData>(response);
      this.pathReturnValueMap[endpoint] = data;
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const respJson = await response.json();
    const resp = respJson as ApiResponseWithCode;
    if (resp.code) {
      throw new GrvtError(resp.code, resp.message || 'Unknown error', resp.status);
    }
    return respJson as T;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.cookie) {
      headers['Cookie'] = `gravity=${this.cookie.gravity}`;
      if (this.cookie.XGrvtAccountId) {
        headers['X-Grvt-Account-Id'] = this.cookie.XGrvtAccountId;
      }
    }

    return headers;
  }

  protected checkValidSymbol(symbol: string): void {
    if (!this.markets) {
      throw new Error('Markets not loaded');
    }
    if (!this.markets[symbol]) {
      throw new Error(`Symbol ${symbol} not found`);
    }
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

    const path = this.endpoints.auth;
    this.cookie = await getCookieWithExpiration(path, this.config.apiKey || null);
    this.pathReturnValueMap[path] = this.cookie;

    if (this.cookie) {
      console.info('Cookie refreshed');
    }

    return this.cookie;
  }

  protected getPathReturnValueMap(): Record<string, any> {
    return this.pathReturnValueMap;
  }

  protected getEndpointReturnValue(endpoint: string): any {
    return this.pathReturnValueMap[endpoint];
  }

  protected wasPathCalled(path: string): boolean {
    return path in this.pathReturnValueMap;
  }
}
