import { DEFAULT_LOG_LEVELS } from './const'
import { LogLevels } from './types'

/**
 * Log levels.
 */
let LOG_LEVELS = DEFAULT_LOG_LEVELS

/**
 * Updates the global log levels.
 * @param value Styles.
 */
export function setLogLevels (value: LogLevels): void {
  LOG_LEVELS = Object.assign({}, value)
}

export { LOG_LEVELS }
