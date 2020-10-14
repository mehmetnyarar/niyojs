import { run } from 'examples/console'

jest.spyOn(console, 'log')

beforeAll(() => {
  jest.clearAllMocks()
})

describe('examples/console', () => {
  it('should run the example', () => {
    run()

    expect(console.log).toHaveBeenCalledTimes(2) // REVIEW Why not 5?
    expect(console.error).toHaveBeenCalledTimes(6)
    expect(console.info).toHaveBeenCalledTimes(6)
    expect(console.warn).toHaveBeenCalledTimes(6)
    expect(console.debug).toHaveBeenCalledTimes(3)
    expect(console.trace).toHaveBeenCalledTimes(3)
  })
})
