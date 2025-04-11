import {
  type ISubscriptionTransport,
  type Subscription,
  TransportError,
} from "../base";
import EventEmitter from "eventemitter3";

export interface WebSocketTransportParameters {
  url: string;
}

interface WebSocketPayload {
  type: string;
  [key: string]: unknown;
}

export class WebSocketTransport implements ISubscriptionTransport {
  private url: string;
  private ws: WebSocket | null = null;
  private emitter = new EventEmitter();
  private isConnected = false;
  private connectPromise: Promise<void> | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(args: WebSocketTransportParameters) {
    this.url = args.url.replace(/\/$/, "");
  }

  private async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    if (this.connectPromise) {
      return this.connectPromise;
    }

    this.connectPromise = new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          this.isConnected = true;
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onclose = () => {
          this.isConnected = false;
          this.ws = null;
          this.handleDisconnect();
        };

        this.ws.onerror = (error) => {
          if (!this.isConnected) {
            reject(new TransportError("WebSocket connection failed"));
          }
          console.error("WebSocket error:", error);
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.emitter.emit(
              data.channel,
              new CustomEvent(data.channel, { detail: data.data })
            );
          } catch (error) {
            console.error("Failed to parse WebSocket message:", error);
          }
        };
      } catch (error) {
        reject(new TransportError("Failed to create WebSocket connection"));
      }
    });

    return this.connectPromise;
  }

  private async handleDisconnect(): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    await new Promise((resolve) => setTimeout(resolve, delay));

    try {
      await this.connect();
    } catch (error) {
      console.error("Reconnection failed:", error);
    }
  }

  async subscribe(
    channel: string,
    payload: WebSocketPayload,
    listener: (data: CustomEvent) => void,
    signal?: AbortSignal
  ): Promise<Subscription> {
    await this.connect();

    if (!this.ws || !this.isConnected) {
      throw new TransportError("WebSocket not connected");
    }

    const subscription = {
      unsubscribe: async () => {
        this.emitter.removeListener(channel, listener);
        if (this.ws && this.isConnected) {
          this.ws.send(JSON.stringify({ ...payload, subscribe: false }));
        }
      },
    };

    this.emitter.on(channel, listener);
    this.ws.send(JSON.stringify({ ...payload, subscribe: true }));

    if (signal) {
      signal.addEventListener("abort", () => {
        subscription.unsubscribe();
      });
    }

    return subscription;
  }
}
