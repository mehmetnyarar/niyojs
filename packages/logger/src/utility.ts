import { ConsoleMethod, LogMethod } from './types'

/**
 * Merges two objects of a type. Skips falsy values.
 * @param base Base values.
 * @param [value={}] Updates.
 * @todo TODO This could be a generic function in another module.
 * @returns Object.
 */
export function merge<T extends Record<string, unknown>> (
  base: T,
  value: Partial<T> = {}
): T {
  const keys = Object.keys(base) as (keyof T)[]
  const result = keys.reduce((obj, key) => {
    obj[key] = value[key] || base[key]
    return obj
  }, {} as Partial<T>)

  return result as T
}

/**
 * Determines the console method for printing.
 * @param level Log method.
 * @returns Console method.
 */
export function getConsoleMethod (level: LogMethod): ConsoleMethod {
  switch (level) {
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

/**
 * Determines whether the typeof value is primitive or not.
 * @param value Value.
 * @returns True if the condition is met.
 */
export function isPrimitive (value: unknown): boolean {
  return ['string', 'number', 'bigint', 'boolean'].includes(typeof value)
}

/**
 * Transforms an error to an object.
 * @param error Error.
 * @returns Object.
 */
export function objectifyError (error: Error): Record<string, unknown> {
  const keys = Object.getOwnPropertyNames(error)

  return keys.reduce((result, key) => {
    const value = (error as never)[key] as unknown
    const items = typeof value === 'string' ? value.split('\n') : value
    result[key] = Array.isArray(items) && items.length === 1 ? items[0] : items

    return result
  }, {} as Record<string, unknown>)
}
