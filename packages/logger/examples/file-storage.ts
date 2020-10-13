import format from 'date-fns/format'
import { appendFile } from 'fs'
import { join } from 'path'
import { Logger } from 'src/logger'
import { LogStorage } from 'src/storage'
import { LogLevel } from 'src/types'

/**
 * FileStorage options.
 */
export interface FileStorageOptions {
  /**
   * Directory to save logs.
   */
  dir: string

  /**
   * Base file name.
   */
  name: string

  /**
   * Max log level to perform the operation.
   * Levels that are higher than this level are suppressed.
   */
  level: LogLevel

  /**
   * Delimiter for lines. Default is pipe.
   */
  delimiter?: string
}

/**
 * Creates a file storage.
 * @param options Options.
 * @returns LogStorage.
 */
export function myPlugin (options: FileStorageOptions): LogStorage {
  const { dir, name, level, delimiter = '|' } = options

  const storage = new LogStorage({
    level,
    fn: entry => {
      const date = format(new Date(), 'yyyyMMdd')
      const path = join(dir, `${name}_${date}.log`)
      const record = Object.keys(entry)
        .map(key => entry[key])
        .join(delimiter)

      appendFile(path, `${record}\n`, { encoding: 'utf-8' }, error => {
        // istanbul ignore next
        if (error) {
          console.debug('An error occured while storing the log!', {
            path,
            entry,
            error
          })
        }
      })
    }
  })

  return storage
}

/**
 * Runs the file-storage example.
 */
export function run (): void {
  const logger = Logger.create({
    src: 'example',
    level: 'debug'
  }).add(
    myPlugin({
      dir: __dirname,
      name: 'example',
      level: 'info'
    })
  )

  logger.error('This is an error message.')
  logger.success('This is a success message.', { count: 1 })
  logger.debug('This should not be saved!')
}
