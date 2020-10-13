import { getConsoleMethod, merge } from 'src/utility'

describe('utiliy', () => {
  describe('merge', () => {
    it('should merge the values', () => {
      let value: Record<string, unknown> = { key1: 1, key2: 2 }
      expect(merge(value, { key1: 4 }, -1)).toEqual({
        key1: 4,
        key2: 2
      })

      value = { key1: 1, key2: 0 }
      expect(merge(value, { key1: 4 }, -1)).toEqual({
        key1: 4,
        key2: -1
      })
    })
  })

  describe('getConsoleMethod', () => {
    it('should return the console method', () => {
      expect(getConsoleMethod('off')).toBeUndefined()
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
})
