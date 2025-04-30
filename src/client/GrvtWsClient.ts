import { GrvtEnvironment } from '../config/config';
import { GrvtBaseClient } from './GrvtBaseClient';
import { TMessageHandler } from '@grvt/client/ws';
import { IWSTransferFeedDataV1 } from '@grvt/client';
import WebSocket from 'ws';

export class GrvtWsClient extends GrvtBaseClient {
  private ws: WebSocket | null = null;
  private readonly url: string;
  private messageHandlers: Map<string, (data: any) => void> = new Map();
  private reconnectAttempts: number = 0;
  private readonly maxReconnectAttempts: number = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private subscriptionId: number = 0;
  private readonly wsReadTimeout: number = 5000; // 5 seconds
  private lastMessageTime: number = Date.now();
  private messageCheckInterval: NodeJS.Timeout | null = null;

  constructor(config: { apiKey: string; env: GrvtEnvironment }) {
    super(config);
    this.url = this.getWebSocketUrl();
  }

  // Only support TDG for now, can be extended to support MDG/other streams in the future
  private getWebSocketUrl(): string {
    return `wss://trades.${this.domain}/ws/full`;
  }

  public async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Get authentication parameters before creating the WebSocket
      this.refreshCookie()
        .then(() => {
          const headers: Record<string, string> = {};

          if (this.cookie?.gravity) {
            headers['Cookie'] = `gravity=${this.cookie.gravity}`;
          }
          if (this.cookie?.XGrvtAccountId) {
            headers['X-Grvt-Account-Id'] = this.cookie.XGrvtAccountId;
          }

          this.ws = new WebSocket(this.url, {
            headers,
          });

          this.ws.on('open', () => {
            console.log('WebSocket connected');
            this.reconnectAttempts = 0;
            this.startMessageCheck();
            resolve();
          });

          this.ws.on('message', (data: string) => {
            try {
              const message = JSON.parse(data);
              this.lastMessageTime = Date.now();
              const handler = this.messageHandlers.get(message.stream + '.' + message.selector);
              if (handler) {
                handler(message.feed);
              }
            } catch (error) {
              console.error('Error parsing message:', error);
            }
          });

          this.ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            this.handleReconnect();
            reject(error);
          });

          this.ws.on('close', () => {
            console.log('WebSocket disconnected');
            this.stopMessageCheck();
            this.handleReconnect();
          });
        })
        .catch(reject);
    });
  }

  private startMessageCheck(): void {
    this.stopMessageCheck();
    this.lastMessageTime = Date.now();
    this.messageCheckInterval = setInterval(() => {
      const timeSinceLastMessage = Date.now() - this.lastMessageTime;
      if (timeSinceLastMessage > this.wsReadTimeout) {
        console.log('No messages received for too long, reconnecting...');
        this.handleReconnect();
      }
    }, this.wsReadTimeout);
  }

  private stopMessageCheck(): void {
    if (this.messageCheckInterval) {
      clearInterval(this.messageCheckInterval);
      this.messageCheckInterval = null;
    }
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
      }

      this.reconnectTimeout = setTimeout(() => {
        console.log(
          `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
        );
        this.connect().catch(console.error);
      }, delay);
    }
  }

  public subscribeTransferHistory(
    main_account_id: string,
    handler: TMessageHandler<Required<IWSTransferFeedDataV1>['feed']>,
    sub_account_id?: string
  ): void {
    if (!this.ws) {
      throw new Error('WebSocket not connected');
    }

    const stream = 'v1.transfer';
    const selector = sub_account_id ? main_account_id + '-' + sub_account_id : main_account_id;
    const message = {
      jsonrpc: '2.0',
      method: 'subscribe',
      params: {
        stream,
        selectors: [selector],
      },
      id: ++this.subscriptionId,
    };

    this.ws.send(JSON.stringify(message));
    this.messageHandlers.set(stream + '.' + selector, handler);
  }

  public disconnect(): void {
    this.stopMessageCheck();
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
