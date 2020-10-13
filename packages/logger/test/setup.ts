import { LogMethod } from 'src/types'

// Disable console printing for the following methods during the tests
const originalConsole = { ...console }
const consoleMocks: LogMethod[] = ['debug', 'error', 'info', 'trace', 'warn']

beforeAll(() => {
  consoleMocks.forEach(method => {
    jest.spyOn(global.console, method).mockImplementation(jest.fn)
  })
})

afterAll(() => {
  jest.restoreAllMocks()
  global.console = originalConsole
})
