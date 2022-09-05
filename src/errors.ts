/* eslint-disable max-classes-per-file -- Errors can be defined in the same file */
import { inspect } from 'util'

/**
 * Base Error class for openmev-router-devkit. All Errors thrown by openmev-router-devkit should throw
 * OpenMevErrors.
 *
 * @category Errors
 */
class OpenMevError extends Error {
  public readonly name: string
  public readonly message: string
  public readonly data?: unknown

  /**
   * Construct an OpenMevError.
   *
   * @param message - The error message.
   * @param data - The data that caused the error.
   */
  public constructor(message = '', data?: unknown) {
    super(message)

    this.name = this.constructor.name
    this.message = message
    this.data = data
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- `captureStackTrace` can be null in browsers
    if (Error.captureStackTrace != null) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  /**
   * Converts the Error to a human-readable String form.
   *
   * @returns The String output of the Error.
   */
  public toString(): string {
    let result = `[${this.name}(${this.message}`
    if (this.data) {
      result += `, ${inspect(this.data)}`
    }
    result += ')]'
    return result
  }

  /**
   * Console.log in node uses util.inspect on object, and util.inspect allows
   * us to customize its output:
   * https://nodejs.org/api/util.html#util_custom_inspect_function_on_objects.
   *
   * @returns The String output of the Error.
   */
  public inspect(): string {
    return this.toString()
  }
}

/**
 * Error thrown when web3 provider responds with an error.
 *
 * @category Errors
 */
class Web3Error extends OpenMevError {}

/**
 * Error thrown when openmev-router-devkit cannot specify error type.
 *
 * @category Errors
 */
class UnexpectedError extends OpenMevError {}

/**
 * Error thrown when openmev-router-devkit has an error with connection to web3 provider.
 *
 * @category Errors
 */
class ConnectionError extends OpenMevError {}

/**
 * Error thrown when openmev-router-devkit is not connected to web3 provider server.
 *
 * @category Errors
 */
class NotConnectedError extends ConnectionError {}

/**
 * Error thrown when openmev-router-devkit has disconnected from web3 provider server.
 *
 * @category Errors
 */
class DisconnectedError extends ConnectionError {}

/**
 * Error thrown when web3 provider is not initialized.
 *
 * @category Errors
 */
class Web3NotInitializedError extends ConnectionError {}

/**
 * Error thrown when openmev-router-devkit times out.
 *
 * @category Errors
 */
class TimeoutError extends ConnectionError {}

/**
 * Error thrown when openmev-router-devkit sees a response in the wrong format.
 *
 * @category Errors
 */
class ResponseFormatError extends ConnectionError {}

/**
 * Error thrown when openmev-router-devkit sees a malformed transaction.
 *
 * @category Errors
 */
class ValidationError extends OpenMevError {}

/**
 * Error thrown when a client cannot generate a wallet from the testnet/devnet
 * faucets, or when the client cannot infer the faucet URL (i.e. when the Client
 * is connected to mainnet).
 *
 * @category Errors
 */
class OMRFaucetError extends OpenMevError {}

/**
 * Error thrown when openmev-router-devkit cannot retrieve a transaction, ledger, account, etc.
 * From web3 provider.
 *
 * @category Errors
 */
class NotFoundError extends OpenMevError {
  /**
   * Construct an OpenMevError.
   *
   * @param message - The error message. Defaults to "Not found".
   */
  public constructor(message = 'Not found') {
    super(message)
  }
}

export {
  OpenMevError,
  UnexpectedError,
  ConnectionError,
  Web3Error,
  NotConnectedError,
  DisconnectedError,
  Web3NotInitializedError,
  TimeoutError,
  ResponseFormatError,
  ValidationError,
  NotFoundError,
  OMRFaucetError,
}
