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
export type LogMethod = Exclude<LogLevel, 'off'>

/**
 * Console method.
 */
export type ConsoleMethod = Extract<
  LogMethod,
  'debug' | 'error' | 'info' | 'trace' | 'warn'
>

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
 * Primitive types.
 */
export type Primitives = string | number | boolean

/**
 * Log meta.
 */
export type LogMeta = Primitives | Record<string, unknown> | Error

/**
 * Determines how the meta should be printed to the console.
 */
export interface LogMetaOptions extends Record<string, unknown> {
  /**
   * If true, then the output will be styled with ANSI color codes.
   * Node only.
   * Default: false.
   */
  colors?: boolean

  /**
   * Determines how many times to recurse while formatting the object.
   * Useful for inspecting large complicated objects.
   * Node only.
   * Default: 2.
   */
  depth?: number

  /**
   * If true, object's non-enumerable and symbol properties will be shown.
   * Node only.
   * Default: false.
   */
  showHidden?: boolean

  /**
   * Meta separator for primitive types.
   * Default is ">".
   */
  separator?: string
}

/**
 * Log levels.
 */
export type LogLevels = Record<LogLevel, number>

/**
 * Log styles.
 */
export type LogStyles = Record<LogLevel, string>
