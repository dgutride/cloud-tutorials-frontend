/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
const merge = require('lodash.merge');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { jestModuleMapper } = require('../utils/tooling/aliasHelper');
const { compilerOptions } = require('./tsconfig.json');
const commonConfig = require('../test_common/jest.common.config');

const config = {
  setupFilesAfterEnv: ['<rootDir>/../test_common/jest_rtl_setup.ts'],
  testMatch: ['**/*.(spec|steps).[jt]s?(x)'],
  coverageDirectory: '<rootDir>/../coverage/client',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    ...jestModuleMapper,
    '\\.(css|less)$':
      '<rootDir>/../node_modules/@patternfly/react-styles/__mocks__/styleMock.js',
    'react-i18next': '<rootDir>/../__mocks__/react-i18next.tsx',
  },
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/*.{js,ts,jsx,tsx}',
    '!**/index.{js,ts,jsx,tsx}',
    '!**/*.steps.*',
    '!**/*.d.ts',
    '!**/*types.ts',
    '!**/*.assets.{ts,tsx}',
    '!jest.config.js',
    '!**/mock/**/*',
    // Wrapper around graphql - not something we need/wish to test
    '!Bootstrap/GraphQLClient/**',
    '!Bootstrap/bootstrap.tsx',
  ],
};

module.exports = merge({}, commonConfig, config);
