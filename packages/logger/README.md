# README

A custom console API which provides conditional logging and the capability of storing logs in various environments.

```ts
import { Logger, LogStorage } from '@niyojs/logger'

const logger = Logger.create({
  // Origin
  src: 'my-module',
  // Print log messages to the console
  // if the log level of the message is "debug" and below
  level: 'debug',
  storages: [
    new LogStorage({
      // Store log messages if the log level of the message is "warn" and below
      level: 'warn',
      fn: entry => {
        // Your custom function to store log
        // Runs synchronously
      }
    })
  ]
})

// or
const logger = Logger.create({ src: 'example', level: 'info' }).add(
  yourStoragePlugin({
    // ...parameters
  })
)
```

Below methods can be used for logging in addition to the standard console methods (debug, error, info, warn, trace):

- **fatal**: Critical errors (`console.error`)
- **todo**: Todo messages (`console.warn`)
- **success**: Success messages (`console.info`)
- **newline**: Prints new lines to the console

## Levels

Default log levels:

| Level   | Severity | Description      |
| ------- | -------- | ---------------- |
| off     | 0        | Silent mode      |
| fatal   | 1        | Critical errors  |
| error   | 2        | Errors           |
| success | 3        | Success messages |
| info    | 4        | Info messages    |
| todo    | 5        | To-do messages   |
| warn    | 6        | Warnings         |
| debug   | 7        | Debugging        |
| trace   | 8        | Tracing          |

Log levels can be customized via:

```tsx
import { setLogLevels } from '@niyojs/logger'
setLogLevels({
  // Your custom log levels
})
```

## Styles

The messages are printed to the console with styles. See `DEFAULT_NODE_STYLES` (chalk) and `DEFAULT_BROWSER_STYLES` (css) for their default values.

Log styles can be customized via:

```tsx
import { setNodeStyles, setBrowserStyles } from '@niyojs/logger'
setNodeStyles({
  // Your custom log levels
})
setBrowserStyles({
  // Your custom log levels
})
```

## Storages

See [this example](/packages/logger/examples/file-storage.ts) to see how log messages are saved to the files.

> You may run all the examples via `yarn --cwd packages/logger eg` command.
