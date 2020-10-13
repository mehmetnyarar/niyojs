import { LogLevel, LogMethod } from './types'

/**
 * Merges two objects of a type. Skips falsy values.
 * @param base Base values.
 * @param value Updates.
 * @param defaultValue Default value.
 * @todo TODO This could be a generic function in another module.
 * @returns Object.
 */
export function merge<T = never> (
  base: Record<string, T>,
  value: Partial<Record<string, T>>,
  defaultValue: T
): Record<string, T> {
  const keys = Object.keys(base) as string[]
  const result = keys.reduce((obj, key) => {
    obj[key] = value[key] || base[key] || defaultValue
    return obj
  }, {} as Partial<Record<string, T>>)

  return result as Record<string, T>
}

/**
 * Determines the console method for printing.
 * @param level Log level.
 * @returns Leveled console method.
 */
export function getConsoleMethod (level: LogLevel): LogMethod | undefined {
  switch (level) {
    case 'off':
      return undefined
    case 'fatal':
      return 'error'
    case 'success':
      return 'info'
    case 'todo':
      return 'warn'
    default:
      return level
  }
}
