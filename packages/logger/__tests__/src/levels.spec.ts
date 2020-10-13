import { DEFAULT_LOG_LEVELS } from 'src/const'
import { LOG_LEVELS, setLogLevels } from 'src/levels'

describe('levels', () => {
  describe('setLogLevels', () => {
    it('should update the log levels', () => {
      expect(LOG_LEVELS.todo).toBe(DEFAULT_LOG_LEVELS.todo)
      expect(LOG_LEVELS.success).toBe(DEFAULT_LOG_LEVELS.success)

      setLogLevels({
        off: 0,
        fatal: 1,
        error: 2,
        todo: 3,
        warn: 4,
        success: 5,
        info: 6,
        debug: 7,
        trace: 8
      })

      expect(LOG_LEVELS.todo).toBe(3)
      expect(LOG_LEVELS.success).toBe(5)
    })
  })
})
