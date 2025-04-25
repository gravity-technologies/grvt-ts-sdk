import { GrvtError } from './types/error';

interface ApiResponse {
  code?: number;
  message?: string;
  [key: string]: any;
}

class GrvtRaw {
  private readonly tdRpc: string;
  private readonly headers: Record<string, string>;

  constructor(baseUrl: string, apiKey?: string) {
    this.tdRpc = `${baseUrl}/td_rpc`;
    this.headers = {
      'Content-Type': 'application/json',
      ...(apiKey && { 'X-API-Key': apiKey }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const respJson = await response.json() as ApiResponse;
    if (respJson.code) {
      throw new GrvtError(respJson.code, respJson.message || 'Unknown error', response.status);
    }
    return respJson as T;
  }

  private async post<T>(needsAuth: boolean, url: string, data: any): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async openOrdersV1(req: any): Promise<any> {
    return this.post(true, `${this.tdRpc}/full/v1/open_orders`, req);
  }

  async orderHistoryV1(req: any): Promise<any> {
    return this.post(true, `${this.tdRpc}/full/v1/order_history`, req);
  }

  async preOrderCheckV1(req: any): Promise<any> {
    return this.post(true, `${this.tdRpc}/full/v1/pre_order_check`, req);
  }

  async createBulkOrdersV1(req: any): Promise<any> {
    return this.post(true, `${this.tdRpc}/full/v1/create_bulk_orders`, req);
  }

  async getOrderGroupV1(req: any): Promise<any> {
    return this.post(true, `${this.tdRpc}/full/v1/order_group`, req);
  }

  async positionsV1(req: any): Promise<any> {
    return this.post(true, `${this.tdRpc}/full/v1/positions`, req);
  }

  async fundingPaymentHistoryV1(req: any): Promise<any> {
    return this.post(true, `${this.tdRpc}/full/v1/funding_payment_history`, req);
  }

  async setInitialLeverageV1(req: any): Promise<any> {
    return this.post(true, `${this.tdRpc}/full/v1/set_initial_leverage`, req);
  }
}

export { GrvtRaw }; 