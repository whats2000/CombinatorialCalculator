export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
      useESM: true
    }
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};
