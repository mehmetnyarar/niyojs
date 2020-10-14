import { ConsoleMethod } from 'src/types'

// Disable console printing for the following methods during the tests
const originalConsole = { ...console }
const consoleMocks: ConsoleMethod[] = [
  'debug',
  'error',
  'info',
  'trace',
  'warn'
]

beforeAll(() => {
  jest.spyOn(console, 'dir')
  consoleMocks.forEach(method => {
    jest.spyOn(global.console, method).mockImplementation(jest.fn)
  })
})

afterAll(() => {
  jest.restoreAllMocks()
  global.console = originalConsole
})
