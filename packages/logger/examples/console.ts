import { Logger } from 'src/logger'

const logger = new Logger({
  src: 'example',
  level: 'trace'
})

/**
 * Console examples.
 */
export function run (): void {
  logger.log('Messages')
  logger.fatal('Critical error')
  logger.error('Some error occured')
  logger.success('It was successful')
  logger.info('Very informative message')
  logger.todo('You should do it')
  logger.warn('Pay attention please')
  logger.debug('Debug me')
  logger.trace('Trace me')

  logger.newline()
  logger.log('Messages with primitive meta')
  logger.fatal('Critical error', 'Operation halted!')
  logger.error('Some error occured', 500)
  logger.success('It was successful', 'Yes')
  logger.info('Very informative message', false)
  logger.todo('You should do it', true)
  logger.warn('Pay attention please', 5)
  logger.debug('Debug me', 'of course')
  logger.trace('Trace me', 'or not')

  logger.newline()
  logger.log('Messages with non-primitive meta')
  logger.fatal('Critical error', { halt: true, retry: false })
  logger.error('Some error occured', new Error('Error code: 500.'))
  logger.success('It was successful', { result: 'Yes' })
  logger.info('Very informative message', { data: false })
  logger.todo('You should do it', { list: new Array(30).fill('item') })
  logger.warn('Pay attention please', { times: 5 })
  logger.debug('Debug me', { meta: 'of course' })
  logger.trace('Trace me', { meta: 'or not' })
}
