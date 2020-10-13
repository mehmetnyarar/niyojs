/**
 * Log level.
 */
export type LogLevel =
  | 'off'
  | 'fatal'
  | 'error'
  | 'success'
  | 'info'
  | 'todo'
  | 'warn'
  | 'debug'
  | 'trace'

/**
 * Log method.
 */
export type LogMethod = 'debug' | 'error' | 'info' | 'log' | 'trace' | 'warn'

/**
 * Entry for log storage.
 */
export interface LogEntry {
  /**
   * Origin.
   */
  src: string

  /**
   * Date.
   */
  date: string

  /**
   * Log level.
   */
  level: LogLevel

  /**
   * Message.
   */
  message: string

  /**
   * Additional information.
   */
  meta?: string

  // Indexer
  [key: string]: string | undefined
}

/**
 * Log meta.
 */
export type LogMeta = Record<string, unknown> | Error

/**
 * Log levels.
 */
export type LogLevels = Record<LogLevel, number>

/**
 * Log styles.
 */
export type LogStyles = Record<LogLevel, string>
