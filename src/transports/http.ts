import { type IRequestTransport, TransportError } from "../base";

export interface HttpTransportParameters {
  url: string;
}

export class HttpTransport implements IRequestTransport {
  private url: string;

  constructor(args: HttpTransportParameters) {
    this.url = args.url.replace(/\/$/, "");
  }

  async request(
    endpoint: "info" | "exchange" | "explorer",
    payload: unknown,
    signal?: AbortSignal
  ): Promise<unknown> {
    try {
      const response = await fetch(`${this.url}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal,
      });

      if (!response.ok) {
        throw new TransportError(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof TransportError) {
        throw error;
      }
      throw new TransportError(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
}
