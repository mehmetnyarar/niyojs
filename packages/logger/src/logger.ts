import chalk from 'chalk'
import { DEFAULT_META_OPTIONS } from './const'
import { LOG_LEVELS } from './levels'
import { LogStorage } from './storage'
import { BROWSER_STYLES, NODE_STYLES } from './styles'
import { LogLevel, LogMeta, LogMetaOptions, LogMethod } from './types'
import { getConsoleMethod, isPrimitive, merge, objectifyError } from './utility'

/**
 * Options to create a new Logger.
 */
export interface LoggerOptions {
  /**
   * Origin. Default is "main".
   */
  src?: string

  /**
   * Max log level to print logs to the console.
   * Levels that are higher than this level are suppressed.
   * Default is "info".
   */
  level?: LogLevel

  /**
   * Storages. Default is empty array.
   */
  storages?: LogStorage[]

  /**
   * Meta display options.
   */
  meta?: LogMetaOptions
}

/**
 * Logger.
 */
export class Logger {
  // #region Properties

  /**
   * Origin.
   */
  readonly src: string

  /**
   * Max log level to print logs to the console.
   * Levels that are higher than this level are suppressed.
   */
  readonly level: LogLevel

  /**
   * Storages.
   */
  readonly storages: LogStorage[]

  /**
   * Meta display options.
   */
  readonly meta: LogMetaOptions

  // #endregion

  // #region Constructor

  /**
   * Initializes a new instance of Logger.
   * @param [options={}] Options.
   */
  constructor (options: LoggerOptions = {}) {
    this.src = options.src || 'main'
    this.level = options.level || 'info'
    this.storages = options.storages || []
    this.meta = merge(DEFAULT_META_OPTIONS, options.meta)
  }

  // #endregion

  // #region Methods

  /**
   * Outputs a message to the console.
   * @param level Log level.
   * @param message Message.
   * @param [meta] Additional information.
   */
  console (level: LogMethod, message: string, meta?: LogMeta): void {
    if (this.level === 'off') return
    if (LOG_LEVELS[level] > LOG_LEVELS[this.level]) return

    const { separator, ...options } = this.meta
    const method = getConsoleMethod(level)
    const primitive = isPrimitive(meta)
    const hasSeparator = meta && separator

    if (typeof window === 'undefined') {
      const time = new Date().toISOString()
      const info = chalk`{grey ${time}} {bold [${this.src}]}`

      let msg = chalk`${info} {${NODE_STYLES[level]} ${message}}`
      if (hasSeparator) msg += chalk`{grey ${separator}}`
      if (primitive) msg += ` ${meta}`

      console[method](msg)
    } else {
      let msg = `%c[${this.src}] %c${message}`
      if (hasSeparator) msg += ` %c${separator}`
      if (primitive) msg += ` ${meta}`

      if (hasSeparator) {
        console[method](
          msg,
          'font: bold;',
          BROWSER_STYLES[level],
          'color: grey;'
        )
      } else {
        console[method](msg, 'font: bold;', BROWSER_STYLES[level])
      }
    }

    if (meta && !primitive) {
      const extra = meta instanceof Error ? objectifyError(meta) : meta
      console.dir(extra, options)
    }
  }

  /**
   * Stores log.
   * @param level Log level.
   * @param message Message.
   * @param [meta] Additional information.
   */
  store (level: LogLevel, message: string, meta?: LogMeta): void {
    if (this.level === 'off') return

    for (const storage of this.storages) {
      if (LOG_LEVELS[level] <= LOG_LEVELS[storage.level]) {
        storage.fn({
          date: new Date().toISOString(),
          src: this.src,
          level,
          message,
          meta: JSON.stringify(meta)
        })
      }
    }
  }

  /**
   * Adds a new storage to the Logger.
   * @param storage Storage.
   * @returns Logger.
   */
  add (storage: LogStorage): Logger {
    this.storages.push(storage)
    return this
  }

  // #endregion

  // #region Custom Console API

  assert = console.assert
  clear = console.clear
  count = console.count
  countReset = console.countReset

  /**
   * Logs a debug message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  debug (message: string, meta?: LogMeta): void {
    this.console('debug', message, meta)
    this.store('debug', message, meta)
  }

  dir = console.dir
  dirxml = console.dirxml

  /**
   * Logs an error message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  error (message: string, meta?: LogMeta): void {
    this.console('error', message, meta)
    this.store('error', message, meta)
  }

  group = console.group
  groupCollapsed = console.groupCollapsed
  groupEnd = console.groupEnd

  /**
   * Logs an info message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  info (message: string, meta?: LogMeta): void {
    this.console('info', message, meta)
    this.store('info', message, meta)
  }

  log = console.log
  table = console.table
  time = console.time
  timeEnd = console.timeEnd
  timeLog = console.timeLog

  /**
   * Logs a trace message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  trace (message: string, meta?: LogMeta): void {
    this.console('trace', message, meta)
    this.store('trace', message, meta)
  }

  /**
   * Logs a warning message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  warn (message: string, meta?: LogMeta): void {
    this.console('warn', message, meta)
    this.store('warn', message, meta)
  }

  profile = console.profile
  profileEnd = console.profileEnd
  timeStamp = console.timeStamp

  // #endregion

  // #region Additional Methods

  /**
   * Logs a fatal error.
   * @param message Message.
   * @param [meta] Additional information.
   */
  fatal (message: string, meta?: LogMeta): void {
    this.console('fatal', message, meta)
    this.store('fatal', message, meta)
  }

  /**
   * Logs a todo message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  todo (message: string, meta?: LogMeta): void {
    this.console('todo', message, meta)
    this.store('todo', message, meta)
  }

  /**
   * Logs a success message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  success (message: string, meta?: LogMeta): void {
    this.console('success', message, meta)
    this.store('success', message, meta)
  }

  /**
   * Prints a new line to the console.
   */
  newline (): void {
    if (this.level !== 'off') {
      console.log('\n')
    }
  }

  // #endregion

  // #region Static

  /**
   * Creates a new Logger.
   * @param [options={}] Options.
   * @returns Logger.
   */
  static create (options: LoggerOptions = {}): Logger {
    return new Logger(options)
  }

  // #endregion
}
