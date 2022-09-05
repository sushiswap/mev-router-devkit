/* eslint-disable import/no-unused-modules -- Used by webpack */
/* eslint-disable max-classes-per-file -- Needs to be a wrapper for ws */
import { EventEmitter } from 'events'

// Define the global WebSocket class found on the native browser
declare class WebSocket {
  public onclose?: () => void
  public onopen?: () => void
  public onerror?: (error: Error) => void
  public onmessage?: (message: MessageEvent) => void
  public readyState: number
  public constructor(url: string)
  public close(code?: number): void
  public send(message: string): void
}

interface WSWrapperOptions {
  perMessageDeflate: boolean
  handshakeTimeout: number
  protocolVersion: number
  origin: string
  maxPayload: number
  followRedirects: boolean
  maxRedirects: number
}

/**
 * Provides `EventEmitter` interface for native browser `WebSocket`,
 * same, as `ws` package provides.
 */
export default class WSWrapper extends EventEmitter {
  public static CONNECTING = 0
  public static OPEN = 1
  public static CLOSING = 2
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- magic number is being defined here
  public static CLOSED = 3
  private readonly ws: WebSocket

  /**
   * Constructs a browser-safe websocket.
   *
   * @param url - URL to connect to.
   * @param _protocols - Not used.
   * @param _websocketOptions - Not used.
   */
  public constructor(
    url: string,
    _protocols: string | string[] | WSWrapperOptions | undefined,
    _websocketOptions: WSWrapperOptions,
  ) {
    super()
    this.setMaxListeners(Infinity)

    this.ws = new WebSocket(url)

    this.ws.onclose = (): void => {
      this.emit('close')
    }

    this.ws.onopen = (): void => {
      this.emit('open')
    }

    this.ws.onerror = (error): void => {
      this.emit('error', error)
    }

    this.ws.onmessage = (message: MessageEvent): void => {
      this.emit('message', message.data)
    }
  }

  /**
   * Closes the websocket.
   */
  public close(): void {
    if (this.readyState === 1) {
      this.ws.close()
    }
  }

  /**
   * Sends a message over the Websocket connection.
   *
   * @param message - Message to send.
   */
  public send(message: string): void {
    this.ws.send(message)
  }

  /**
   * Get the ready state of the websocket.
   *
   * @returns The Websocket's ready state.
   */
  public get readyState(): number {
    return this.ws.readyState
  }
}