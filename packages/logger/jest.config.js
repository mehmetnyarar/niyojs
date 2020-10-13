module.exports = {
  projects: [
    {
      displayName: 'logger:test',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/**/+(*.)+(spec|test).+(js|ts)'],
      moduleNameMapper: {
        '^examples/(.*)$': '<rootDir>/examples/$1',
        '^src/(.*)$': '<rootDir>/src/$1',
        '^test/(.*)$': '<rootDir>/test/$1'
      },
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts']
    },
    {
      displayName: 'logger:lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/**/*.{js,ts}'],
      testPathIgnorePatterns: ['<rootDir>/coverage', '<rootDir>/lib']
    }
  ],
  collectCoverageFrom: [
    '<rootDir>/examples/**/*.ts',
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/**/index.ts',
    '!<rootDir>/**/const.ts'
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
    }
  }
}
