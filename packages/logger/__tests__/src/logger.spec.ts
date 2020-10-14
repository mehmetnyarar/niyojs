import { Logger } from 'src/logger'
import { LogStorage } from 'src/storage'

const infoSpy = jest.spyOn(console, 'info')
const dirSpy = jest.spyOn(console, 'dir')
const node = typeof window === 'undefined'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('logger', () => {
  describe('constructor', () => {
    it('should create a logger (default)', () => {
      const logger = new Logger()
      expect(logger.src).toBe('main')
      expect(logger.level).toBe('info')
      expect(logger.storages).toHaveLength(0)
    })

    it('should create a logger (custom)', () => {
      const logger = new Logger({
        src: 'test',
        level: 'warn',
        storages: [
          new LogStorage({
            level: 'error',
            fn: jest.fn()
          })
        ]
      })
      expect(logger.src).toBe('test')
      expect(logger.level).toBe('warn')
      expect(logger.storages).toHaveLength(1)
    })
  })

  describe('console', () => {
    it('should not print to the console (off)', () => {
      const logger = new Logger({ level: 'off' })
      logger.console('info', 'Test message')
      expect(console.info).not.toHaveBeenCalled()
    })

    it('should not print to the console (level)', () => {
      const logger = new Logger({ level: 'error' })
      logger.console('info', 'Test message')
      expect(console.info).not.toHaveBeenCalled()
    })

    it('should print to the console (node)', () => {
      const logger = new Logger({ src: 'test', level: 'info' })
      logger.console('info', 'Test message')

      expect(console.info).toHaveBeenCalledTimes(1)
      expect(infoSpy.mock.calls[0]).toHaveLength(node ? 1 : 3)
      expect(infoSpy.mock.calls[0][0]).toMatch(/test/i)
      expect(dirSpy).not.toHaveBeenCalled()
    })

    it('should print to the console (node/meta/primitive)', () => {
      const logger = new Logger({ src: 'test', level: 'info' })
      logger.console('info', 'Test message', 'Extra info')

      expect(console.info).toHaveBeenCalledTimes(1)
      expect(infoSpy.mock.calls[0]).toHaveLength(node ? 1 : 4)
      expect(infoSpy.mock.calls[0][0]).toMatch(/extra/i)
      expect(dirSpy).not.toHaveBeenCalled()
    })

    it('should print to the console (node/meta/non-primitive)', () => {
      const logger = new Logger({ src: 'test', level: 'info' })
      const infoSpy = jest.spyOn(console, 'info')
      logger.console('info', 'Test message', { data: 'Extra info' })

      expect(console.info).toHaveBeenCalledTimes(1)
      expect(infoSpy.mock.calls[0]).toHaveLength(node ? 1 : 4)
      expect(infoSpy.mock.calls[0][0]).toMatch(/test/i)
      expect(dirSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('store', () => {
    it('should not store the log (top level off)', () => {
      const storage = new LogStorage({ level: 'info', fn: jest.fn() })
      jest.spyOn(storage, 'fn')

      const logger = new Logger({
        src: 'test',
        level: 'off',
        storages: [storage]
      })
      logger.store('info', 'Test message')
      expect(storage.fn).not.toHaveBeenCalled()
    })

    it('should not store the log (off)', () => {
      const storage = new LogStorage({ level: 'off', fn: jest.fn() })
      jest.spyOn(storage, 'fn')

      const logger = new Logger({
        src: 'test',
        level: 'info',
        storages: [storage]
      })
      logger.store('info', 'Test message')
      expect(storage.fn).not.toHaveBeenCalled()
    })

    it('should store the log', () => {
      const storage = new LogStorage({ level: 'info', fn: jest.fn() })
      jest.spyOn(storage, 'fn')

      const logger = new Logger({
        src: 'test',
        level: 'error',
        storages: [storage]
      })
      logger.store('info', 'Test message')
      expect(storage.fn).toHaveBeenCalled()
    })
  })

  describe('add', () => {
    it('should add a new storage', () => {
      let logger = new Logger()
      expect(logger.storages).toHaveLength(0)

      logger = logger.add(new LogStorage({ level: 'error', fn: jest.fn() }))
      expect(logger.storages).toHaveLength(1)
    })
  })

  describe('api', () => {
    it('should call console/store methods', () => {
      const logger = new Logger({ level: 'trace' })
      jest.spyOn(logger, 'console')
      jest.spyOn(logger, 'store')

      logger.fatal('Fatal')
      expect(logger.console).toHaveBeenCalledWith('fatal', 'Fatal', undefined)
      expect(logger.store).toHaveBeenCalledWith('fatal', 'Fatal', undefined)

      logger.error('Error')
      expect(logger.console).toHaveBeenCalledWith('error', 'Error', undefined)
      expect(logger.store).toHaveBeenCalledWith('error', 'Error', undefined)

      logger.success('OK')
      expect(logger.console).toHaveBeenCalledWith('success', 'OK', undefined)
      expect(logger.store).toHaveBeenCalledWith('success', 'OK', undefined)

      logger.info('Info')
      expect(logger.console).toHaveBeenCalledWith('info', 'Info', undefined)
      expect(logger.store).toHaveBeenCalledWith('info', 'Info', undefined)

      logger.todo('Todo')
      expect(logger.console).toHaveBeenCalledWith('todo', 'Todo', undefined)
      expect(logger.store).toHaveBeenCalledWith('todo', 'Todo', undefined)

      logger.warn('Warn')
      expect(logger.console).toHaveBeenCalledWith('warn', 'Warn', undefined)
      expect(logger.store).toHaveBeenCalledWith('warn', 'Warn', undefined)

      logger.debug('Debug')
      expect(logger.console).toHaveBeenCalledWith('debug', 'Debug', undefined)
      expect(logger.store).toHaveBeenCalledWith('debug', 'Debug', undefined)

      logger.trace('Trace')
      expect(logger.console).toHaveBeenCalledWith('trace', 'Trace', undefined)
      expect(logger.store).toHaveBeenCalledWith('trace', 'Trace', undefined)
    })

    it('should call not print new line', () => {
      let logger = new Logger({ level: 'off' })
      jest.spyOn(console, 'log')
      logger.newline()
      expect(console.log).not.toHaveBeenCalled()

      logger = new Logger({ level: 'error' })
      jest.spyOn(console, 'log')
      logger.newline()
      expect(console.log).toHaveBeenCalled()
    })
  })

  describe('create', () => {
    it('should create a logger', () => {
      const logger = Logger.create()
      expect(logger.src).toBe('main')
      expect(logger.level).toBe('info')
      expect(logger.storages).toHaveLength(0)
    })
  })
})
