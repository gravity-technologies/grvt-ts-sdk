const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');

const { configs: prettierConfigs } = prettierPlugin;


/** @type {import('eslint').Config} */
module.exports = [
  {
    files: ['src/**/*.ts'],
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
      '*.d.ts',
      '*.js',
      '*.test.ts',
      '*.spec.ts',
      '__snapshots__/',
    ],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfigs.recommended.rules,
      '@typescript-eslint/explicit-function-return-type': 'warn',
      // '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-console': 'warn',
    },
  },
];