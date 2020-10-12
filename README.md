# README

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Various helpers and utilities for JS/TS projects.

## Scripts

| Script          | Description                                                               |
| --------------- | ------------------------------------------------------------------------- |
| reset           | Cleans up the repository and installs npm modules                         |
| clean           | Removes npm modules, packager files and cleans up the packages            |
| validate        | Validates all packages                                                    |
| typings         | Validates TS typings in all packages                                      |
| format          | Formats files                                                             |
| format:root     | Formats files under the root directory                                    |
| format:packages | Formats files in all packages                                             |
| lint            | Lints files                                                               |
| lint:root       | Lints files under the root directory                                      |
| lint:packages   | Lints files in all packages                                               |
| test            | Runs tests for the root directory and the packages                        |
| test:coverage   | Runs tests and generates coverage reports                                 |
| precommit       | Ensures that the files are formatted, linted and tested before any commit |
| commit          | Commits changes based on conventional commits standards                   |

You can run scripts from packages manually by using `yarn` or `lerna`:

```sh
yarn --cwd packages/<pkg-dir> <script>
lerna run <script> --scope=<pkg-name> --stream
```

## Dependencies

```sh
# root
yarn <add/remove> <npm-package> -W[D]

# package
yarn workspace @app/<pkg-name> <add/remove> <npm-package> [-D]
```

## Commits

Use `yarn commit` command to commit changes.

- For changes in the root directory, there is no need to specify the scope
- For changes in the packages, specify the scope using the directory name

## Development

## Testing

## Production
