module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '@pages(.*)$': '<rootDir>/src/pages$1',
    '@components(.*)$': '<rootDir>/src/components$1',
    '@ui(.*)$': '<rootDir>/src/components/ui$1',
    '@ui-pages(.*)$': '<rootDir>/src/components/ui/pages$1',
    '@utils-types(.*)$': '<rootDir>/src/utils/types$1',
    '@api(.*)$': '<rootDir>/src/utils/burger-api.ts',
    '@slices(.*)$': '<rootDir>/src/services/slices$1',
    '@selectors(.*)$': '<rootDir>/src/services/selectors$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  moduleDirectories: [
    'node_modules',
    'src'
  ]
};