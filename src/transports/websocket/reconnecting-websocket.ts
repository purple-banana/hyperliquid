// deno-lint-ignore-file no-explicit-any

type MaybePromise<T> = T | Promise<T>;

/**
 * Configuration options for the `ReconnectingWebSocket`.
 */
export interface ReconnectingWebSocketOptions {
    /**
     * Maximum number of reconnection attempts.
     * @defaultValue `3`
     */
    maxRetries?: number;

    /**
     * Maximum time in ms to wait for a connection to open.
     * Set to `null` to disable.
     * @defaultValue `10_000`
     */
    connectionTimeout?: number | null;

    /**
     * Delay between reconnection attempts in ms.
     * May be a number or a function that returns a number.
     * @param attempt - The current attempt number.
     * @defaultValue `(attempt) => Math.min(~~(1 << attempt) * 150, 10_000)` - Exponential backoff (max 10s)
     */
    connectionDelay?: number | ((attempt: number) => MaybePromise<number>);

    /**
     * Custom logic to determine if reconnection is required.
     * @param event - The close event that occurred during the connection.
     * @returns A boolean indicating if reconnection should be attempted.
     * @defaultValue `() => true` - Always reconnect
     */
    shouldReconnect?: (event: CloseEvent) => MaybePromise<boolean>;

    /**
     * Message buffering strategy between reconnection attempts.
     * @defaultValue `new FIFOMessageBuffer()`
     */
    messageBuffer?: MessageBufferStrategy;

    /**
     * Custom WebSocket constructor to use.
     * @defaultValue `new WebSocket(url, protocols)`
     */
    WebSocketConstructor?: typeof WebSocket;
}

/**
 * Message buffer strategy interface.
 */
export interface MessageBufferStrategy {
    /** Array of buffered messages. */
    messages: (string | ArrayBufferLike | Blob | ArrayBufferView)[];
    /**
     * Add a message to the buffer.
     * @param data - The message to buffer.
     */
    push(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;

    /**
     * Get and remove the next message from the buffer.
     * @returns The next message or `undefined` if no more messages are available.
     */
    shift(): (string | ArrayBufferLike | Blob | ArrayBufferView) | undefined;

    /** Clear all buffered messages. */
    clear(): void;
}

/**
 * Simple FIFO (First In, First Out) buffer implementation.
 */
class FIFOMessageBuffer implements MessageBufferStrategy {
    messages: (string | ArrayBufferLike | Blob | ArrayBufferView)[] = [];
    constructor() {}
    push(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
        this.messages.push(data);
    }
    shift(): (string | ArrayBufferLike | Blob | ArrayBufferView) | undefined {
        return this.messages.shift();
    }
    clear(): void {
        this.messages = [];
    }
}

/**
 * A WebSocket that automatically reconnects when disconnected.
 * Fully compatible with standard WebSocket API.
 */
export class ReconnectingWebSocket implements WebSocket {
    /** Controller for handling connection termination */
    protected terminationController: AbortController = new AbortController();

    /** WebSocket protocols */
    protected protocols?: string | string[];

    /** The underlying WebSocket instance */
    protected socket: WebSocket;

    /** Current number of reconnection attempts */
    protected reconnectCount: number = 0;

    /** Array of registered event listeners */
    protected eventListeners: {
        type: string;
        listener: EventListenerOrEventListenerObject;
        options?: boolean | AddEventListenerOptions;
        listenerProxy: EventListenerOrEventListenerObject;
    }[] = [];

    /** Configuration options */
    public reconnectOptions: Required<ReconnectingWebSocketOptions>;

    /** An AbortSignal that is triggered when the connection is permanently closed */
    public readonly terminationSignal: AbortSignal = this.terminationController.signal;

    /**
     * Creates a new reconnecting WebSocket.
     * @param url - The WebSocket URL to connect to.
     * @param protocols - The WebSocket protocols to use.
     * @param options - The configuration options.
     */
    constructor(url: string | URL, protocols?: string | string[], options?: ReconnectingWebSocketOptions) {
        this.reconnectOptions = {
            maxRetries: options?.maxRetries ?? 3,
            connectionTimeout: options?.connectionTimeout === undefined ? 10_000 : options.connectionTimeout,
            connectionDelay: options?.connectionDelay ?? ((attempt) => Math.min(~~(1 << attempt) * 150, 10_000)),
            shouldReconnect: options?.shouldReconnect ?? (() => true),
            messageBuffer: options?.messageBuffer ?? new FIFOMessageBuffer(),
            WebSocketConstructor: options?.WebSocketConstructor ?? WebSocket,
        };

        this.protocols = protocols;
        this.socket = this.reconnectOptions.connectionTimeout
            ? this.connectWithTimeout(url, this.protocols, this.reconnectOptions.connectionTimeout)
            : new this.reconnectOptions.WebSocketConstructor(url, this.protocols);

        this.initEventListeners();
    }

    /**
     * Creates a WebSocket connection with timeout.
     * @param url - The WebSocket URL to connect to.
     * @param protocols - The WebSocket protocols to use.
     * @param timeout - The connection timeout in ms.
     * @returns A new WebSocket instance.
     */
    protected connectWithTimeout(
        url: string | URL,
        protocols: string | string[] | undefined,
        timeout: number,
    ): WebSocket {
        const socket = new this.reconnectOptions.WebSocketConstructor(url, protocols);

        const timeoutId = setTimeout(() => {
            socket.removeEventListener("open", openHandler);
            socket.removeEventListener("close", closeHandler);
            socket.close(3008, "Timeout"); // https://www.iana.org/assignments/websocket/websocket.xml#close-code-number
        }, timeout);

        const openHandler = () => {
            socket.removeEventListener("close", closeHandler);
            clearTimeout(timeoutId);
        };
        const closeHandler = () => {
            socket.removeEventListener("open", openHandler);
            clearTimeout(timeoutId);
        };

        socket.addEventListener("open", openHandler, { once: true });
        socket.addEventListener("close", closeHandler, { once: true });

        return socket;
    }

    /**
     * Initializes the internal event listeners for the WebSocket.
     */
    protected initEventListeners(): void {
        this.socket.addEventListener("open", () => {
            // Reset reconnection count
            this.reconnectCount = 0;

            // Send all buffered messages
            let message: (string | ArrayBufferLike | Blob | ArrayBufferView) | undefined;
            while ((message = this.reconnectOptions.messageBuffer.shift()) !== undefined) {
                this.socket.send(message);
            }
        }, { once: true });

        this.socket.addEventListener("close", async (event) => {
            try {
                // If the termination signal is already aborted, do not attempt to reconnect
                if (this.terminationSignal.aborted) return;

                // Check if reconnection should be attempted
                if (++this.reconnectCount > this.reconnectOptions.maxRetries) {
                    this.cleanup(new Error("RECONNECTION_LIMIT_REACHED", { cause: event }));
                    return;
                }

                const userDecision = await this.reconnectOptions.shouldReconnect(event);
                if (this.terminationSignal.aborted) return; // Check again after the await
                if (!userDecision) {
                    this.cleanup(new Error("RECONNECTION_STOPPED_BY_USER", { cause: event }));
                    return;
                }

                // Delay before reconnecting
                const delay = typeof this.reconnectOptions.connectionDelay === "number"
                    ? this.reconnectOptions.connectionDelay
                    : await this.reconnectOptions.connectionDelay(this.reconnectCount);
                if (this.terminationSignal.aborted) return; // Check again after the await
                await sleep(delay, this.terminationSignal);

                // Reconnect the socket
                this.socket = this.reconnectOptions.connectionTimeout
                    ? this.connectWithTimeout(this.url, this.protocols, this.reconnectOptions.connectionTimeout)
                    : new this.reconnectOptions.WebSocketConstructor(this.url, this.protocols);

                // Reconnect all listeners
                this.initEventListeners();
                this.eventListeners.forEach(({ type, listenerProxy, options }) => {
                    this.socket.addEventListener(type, listenerProxy, options);
                });
            } catch (error) {
                this.cleanup(new Error("RECONNECTION_ERROR", { cause: { error, event } }));
            }
        }, { once: true });
    }

    /**
     * Clean up internal resources.
     * @param reason - The reason for cleanup.
     */
    protected cleanup(reason: unknown): void {
        this.terminationController.abort(reason);
        this.reconnectOptions.messageBuffer.clear();
        this.eventListeners = [];
    }

    /**
     * Check if two event listeners are the same (just like EventTarget).
     * @param a - First event listener configuration.
     * @param b - Second event listener configuration.
     * @returns True if the listeners match.
     */
    protected isListenerMatch(
        a: { type: string; listener: EventListenerOrEventListenerObject; options?: boolean | AddEventListenerOptions },
        b: { type: string; listener: EventListenerOrEventListenerObject; options?: boolean | AddEventListenerOptions },
    ): boolean {
        const aCapture = Boolean(typeof a.options === "object" ? a.options.capture : a.options);
        const bCapture = Boolean(typeof b.options === "object" ? b.options.capture : b.options);
        return a.type === b.type && a.listener === b.listener && aCapture === bCapture;
    }

    // WebSocket property implementations
    get url(): string {
        return this.socket.url;
    }
    get readyState(): number {
        return this.socket.readyState;
    }
    get bufferedAmount(): number {
        return this.socket.bufferedAmount;
    }
    get extensions(): string {
        return this.socket.extensions;
    }
    get protocol(): string {
        return this.socket.protocol;
    }
    get binaryType(): BinaryType {
        return this.socket.binaryType;
    }
    set binaryType(value: BinaryType) {
        this.socket.binaryType = value;
    }

    public readonly CLOSED = WebSocket.CLOSED;
    public readonly CLOSING = WebSocket.CLOSING;
    public readonly CONNECTING = WebSocket.CONNECTING;
    public readonly OPEN = WebSocket.OPEN;

    static readonly CLOSED = WebSocket.CLOSED;
    static readonly CLOSING = WebSocket.CLOSING;
    static readonly CONNECTING = WebSocket.CONNECTING;
    static readonly OPEN = WebSocket.OPEN;

    get onclose(): ((this: WebSocket, ev: CloseEvent) => any) | null {
        return this.socket.onclose;
    }
    set onclose(value: ((this: WebSocket, ev: CloseEvent) => any) | null) {
        this.socket.onclose = value;
    }

    get onerror(): ((this: WebSocket, ev: Event) => any) | null {
        return this.socket.onerror;
    }
    set onerror(value: ((this: WebSocket, ev: Event) => any) | null) {
        this.socket.onerror = value;
    }

    get onmessage(): ((this: WebSocket, ev: MessageEvent<any>) => any) | null {
        return this.socket.onmessage;
    }
    set onmessage(value: ((this: WebSocket, ev: MessageEvent<any>) => any) | null) {
        this.socket.onmessage = value;
    }

    get onopen(): ((this: WebSocket, ev: Event) => any) | null {
        return this.socket.onopen;
    }
    set onopen(value: ((this: WebSocket, ev: Event) => any) | null) {
        this.socket.onopen = value;
    }

    /**
     * @param permanently - If true, the connection will be permanently closed. Default is true.
     */
    close(code?: number, reason?: string, permanently: boolean = true): void {
        if (permanently) this.cleanup(new Error("USER_INITIATED_CLOSE"));
        this.socket.close(code, reason);
    }

    /**
     * @note If the connection is not open, the data will be buffered and sent when the connection is established.
     */
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
        if (this.socket.readyState !== WebSocket.OPEN && !this.terminationSignal.aborted) {
            this.reconnectOptions.messageBuffer.push(data);
        } else {
            this.socket.send(data);
        }
    }

    addEventListener<K extends keyof WebSocketEventMap>(
        type: K,
        listener: (this: ReconnectingWebSocket, ev: WebSocketEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions,
    ): void;
    addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
    ): void {
        // Check if the listener is already added
        const exists = this.eventListeners.some((e) => this.isListenerMatch(e, { type, listener, options }));
        if (exists) return;

        // Wrap the original listener to follow the once option when reconnecting
        const listenerProxy = (event: Event) => {
            try {
                if (typeof listener === "function") {
                    listener.call(this, event);
                } else {
                    listener.handleEvent(event);
                }
            } finally {
                if (typeof options === "object" && options.once === true) {
                    const index = this.eventListeners.findIndex((e) =>
                        this.isListenerMatch(e, { type, listener, options })
                    );
                    if (index !== -1) this.eventListeners.splice(index, 1);
                }
            }
        };
        this.eventListeners.push({ type, listener, options, listenerProxy });
        this.socket.addEventListener(type, listenerProxy, options);
    }

    removeEventListener<K extends keyof WebSocketEventMap>(
        type: K,
        listener: (this: ReconnectingWebSocket, ev: WebSocketEventMap[K]) => any,
        options?: boolean | EventListenerOptions,
    ): void;
    removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions,
    ): void {
        const index = this.eventListeners.findIndex((e) => this.isListenerMatch(e, { type, listener, options }));
        if (index !== -1) {
            const { listenerProxy } = this.eventListeners[index];
            this.socket.removeEventListener(type, listenerProxy, options);
            this.eventListeners.splice(index, 1);
        }
    }

    dispatchEvent(event: Event): boolean {
        return this.socket.dispatchEvent(event);
    }
}

/**
 * Returns a promise that resolves after the specified number of ms,
 * or rejects as soon as the given signal is aborted.
 * @param ms - The number of ms to sleep.
 * @param signal - An optional abort signal.
 * @returns A promise that resolves after the specified delay.
 */
function sleep(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            return reject(signal.reason);
        }

        const onAbort = function (this: AbortSignal) {
            clearTimeout(timer);
            reject(this.reason);
        };

        const timer = setTimeout(() => {
            signal?.removeEventListener("abort", onAbort);
            resolve();
        }, ms);

        signal?.addEventListener("abort", onAbort, { once: true });
    });
}
