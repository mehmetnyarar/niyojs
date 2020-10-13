import { myPlugin } from 'examples/file-storage'
import { appendFile } from 'fs'
import { join } from 'path'
import { LogEntry } from 'src/types'

jest.mock('fs')

describe('storages/file', () => {
  it('should create a file storage', () => {
    const storage = myPlugin({
      dir: join(__dirname),
      name: 'log',
      level: 'error'
    })

    expect(storage.level).toBe('error')
    expect(storage.fn).toBeTruthy()

    const entry: LogEntry = {
      src: 'test',
      date: new Date().toISOString(),
      level: 'error',
      message: 'Message',
      meta: new Error('Critical error.').message
    }
    storage.fn(entry)
    expect(appendFile).toHaveBeenCalled()
  })

  test.todo('Create a test for examples runner')
  test.todo('Test when an error occurs while saving the log file')
})
