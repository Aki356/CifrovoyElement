import eslintConfig from '@delement/eslint-config-master';

export default [
  ...eslintConfig,
  {
    rules: {
      'no-console': 'error',
      'no-alert': 'error'
    },
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly'
      }
    }
  }
];
