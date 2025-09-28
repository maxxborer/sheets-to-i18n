import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import onlyErrorPlugin from 'eslint-plugin-only-error';
import securityPlugin from 'eslint-plugin-security';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

export default [
  // Игнорируемые файлы на основе .eslintignore
  {
    ignores: [
      '**/dist/**',
      '**/.next/**',
      '**/.nuxt/**',
      '**/.cache/**',
      '**/.parcel-cache/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/tests/**',
      '**/mocks/**',
      '**/docs/**',
      '**/k8s/**',
      '**/web-api/**',
      '**/*.config',
      '**/.DS_Store',
      '**/.eslintcache',
      '**/.stylelintcache',
      '**/.env.development',
      '**/.env.*.local',
      '**/npm-debug.log*',
      '**/yarn-debug.log*',
      '**/yarn-error.log*',
      '**/.idea/**',
      '**/.vscode/settings.json',
      '**/*.suo',
      '**/*.ntvs*',
      '**/*.njsproj',
      '**/*.sln',
      '**/*.sw?',
      '**/.husky/**',
      '**/live/**',
      '**/graphql/gql/**',
      // Игнорируем старые файлы конфигурации ESLint
      '.eslintrc.json',
      '.eslintignore',
    ],
  },

  // Базовая конфигурация для JS/TS файлов
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node.js глобальные переменные
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        console: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        module: 'readonly',
        process: 'readonly',
        require: 'readonly',
        // Browser глобальные переменные
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      sonarjs: sonarjsPlugin,
      security: securityPlugin,
      'unused-imports': unusedImportsPlugin,
      import: importPlugin,
      'only-error': onlyErrorPlugin,
    },
    rules: {
      // Объединяем правила из eslint:recommended и кастомные правила
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,

      // SonarJS правила
      'sonarjs/todo-tag': 0,
      'sonarjs/arguments-order': 0,
      'sonarjs/deprecation': 0,
      'sonarjs/no-invalid-await': 0,
      'sonarjs/no-dead-store': 0,
      'sonarjs/redundant-type-aliases': 0,
      'sonarjs/aws-restricted-ip-admin-access': 0,
      'sonarjs/no-redundant-assignments': 0,
      'sonarjs/use-type-alias': 0,
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/cognitive-complexity': 'warn',

      // TypeScript правила (применяются только к TS файлам)
      '@typescript-eslint/no-implied-eval': 0,
      '@typescript-eslint/no-throw-literal': 0,
      '@typescript-eslint/return-await': 0,
      '@typescript-eslint/dot-notation': 0,
      '@typescript-eslint/no-var-requires': 0,

      // Security правила
      'security/detect-object-injection': 0,
      'security/detect-non-literal-require': 0,

      // Основные правила
      'space-before-function-paren': 0,
      camelcase: 0,
      'no-else-return': ['error', { allowElseIf: true }],
      'arrow-body-style': ['error', 'as-needed'],
      'comma-dangle': ['warn', 'only-multiline'],
      semi: ['warn', 'always'],
      'id-length': ['warn', { min: 2, exceptions: ['_'], properties: 'never' }],
      curly: ['error', 'all'],
      'brace-style': ['error', '1tbs', { allowSingleLine: false }],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info', 'groupCollapsed', 'table', 'groupEnd', 'assert', 'debug'],
        },
      ],
      'no-unused-vars': 'warn',

      // Import правила
      'import/no-cycle': ['warn', { ignoreExternal: true, maxDepth: 5 }],
      'import/no-self-import': 'warn',
      'import/first': 'warn',
      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'error',

      // Padding правила
      'padding-line-between-statements': [
        'warn',
        {
          blankLine: 'always',
          prev: '*',
          next: ['multiline-const', 'multiline-expression', 'return', 'multiline-block-like'],
        },
        { blankLine: 'always', prev: 'iife', next: '*' },
        {
          blankLine: 'always',
          prev: ['import', 'function', 'multiline-expression', 'const', 'let', 'var'],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: 'const', next: 'const' },
        { blankLine: 'any', prev: '*', next: 'singleline-const' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: 'import', next: 'const' },
        { blankLine: 'any', prev: 'case', next: 'case' },
      ],

      // Unused imports правила
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Конфигурация для TypeScript файлов
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Конфигурация для тестовых файлов
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    languageOptions: {
      globals: {
        // Vitest глобальные переменные
        describe: 'readonly',
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
      },
    },
    rules: {
      'sonarjs/no-duplicate-string': 'off',
    },
  },

  // Конфигурация для конфигурационных файлов
  {
    files: ['vitest.config.ts', '*.config.js', '*.config.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },

  // Конфигурация для CommonJS файлов
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        // CommonJS глобальные переменные
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
