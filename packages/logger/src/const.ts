import { LogLevels, LogStyles } from './types'

/**
 * Log levels.
 */
export const DEFAULT_LOG_LEVELS: LogLevels = {
  off: 0,
  fatal: 1,
  error: 2,
  success: 3,
  info: 4,
  todo: 5,
  warn: 6,
  debug: 7,
  trace: 8
}

/**
 * Default styles for the node/terminal (chalk).
 */
export const DEFAULT_NODE_STYLES: LogStyles = {
  off: 'hidden',
  fatal: 'red',
  error: 'red',
  todo: 'purple',
  warn: 'yellow',
  success: 'green',
  info: 'blue',
  debug: 'visible',
  trace: 'visible'
}

/**
 * Default styles for browsers (css).
 */
export const DEFAULT_BROWSER_STYLES: LogStyles = {
  off: '',
  fatal: 'color: darkred;',
  error: 'color: red;',
  todo: 'color: magenta;',
  warn: 'color: orange;',
  success: 'color: green;',
  info: 'color: navy;',
  debug: '',
  trace: ''
}
