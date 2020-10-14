import {
  getConsoleMethod,
  isPrimitive,
  merge,
  objectifyError
} from 'src/utility'

describe('utiliy', () => {
  describe('merge', () => {
    it('should merge the values', () => {
      let value: Record<string, unknown> = { key1: 1, key2: 2 }
      expect(merge(value, { key1: 4 })).toEqual({
        key1: 4,
        key2: 2
      })

      value = { key1: 1, key2: 0 }
      expect(merge(value, { key1: 4 })).toEqual({
        key1: 4,
        key2: 0
      })
    })
  })

  describe('getConsoleMethod', () => {
    it('should return the console method', () => {
      expect(getConsoleMethod('fatal')).toBe('error')
      expect(getConsoleMethod('error')).toBe('error')
      expect(getConsoleMethod('success')).toBe('info')
      expect(getConsoleMethod('info')).toBe('info')
      expect(getConsoleMethod('todo')).toBe('warn')
      expect(getConsoleMethod('warn')).toBe('warn')
      expect(getConsoleMethod('debug')).toBe('debug')
      expect(getConsoleMethod('trace')).toBe('trace')
    })
  })

  describe('isPrimitive', () => {
    it('should determine primitivity correctly', () => {
      expect(isPrimitive(undefined)).toBeFalsy()
      expect(isPrimitive('')).toBeTruthy()
      expect(isPrimitive(0)).toBeTruthy()
      expect(isPrimitive(false)).toBeTruthy()
      expect(isPrimitive([])).toBeFalsy()
      expect(isPrimitive({ test: '' })).toBeFalsy()
      expect(isPrimitive(new Error('test'))).toBeFalsy()
    })
  })

  describe('objectifyError', () => {
    it('should transform an error to an object', () => {
      const error = objectifyError(new Error('Error message.'))
      expect(error).toHaveProperty('stack')
      expect(error).toHaveProperty('message')
      expect(error.message).toBe('Error message.')
    })
  })
})
