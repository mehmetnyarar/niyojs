import { LogEntry, LogLevel } from './types'

/**
 * Storage implementation.
 */
export type LogStorageFn = (entry: LogEntry) => void | Promise<void>

/**
 * Options to create a new LogStorage instance.
 */
export interface LogStorageOptions {
  /**
   * Max log level to perform the operation.
   * Levels that are higher than this level are suppressed.
   */
  level: LogLevel

  /**
   * Storage implementation.
   */
  fn: LogStorageFn
}

export class LogStorage {
  // #region Properties

  /**
   * Max log level to perform logging.
   * Levels that are higher than this level are suppressed.
   */
  readonly level: LogLevel

  /**
   * Storage implementation.
   */
  readonly fn: LogStorageFn

  // #endregion

  // #region Constructor

  /**
   * Initializes a new instance of LogStorage.
   * @param options Options.
   */
  constructor (options: LogStorageOptions) {
    this.level = options.level
    this.fn = options.fn
  }

  // #endregion
}
