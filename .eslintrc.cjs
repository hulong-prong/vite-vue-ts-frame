/*
 * @Author: HULONG
 * @Date: 2022-11-24 10:28:55
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 15:22:13
 * @Description:
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
          Function: false,
        },
      },
    ],
    'vue/no-multiple-template-root': 0,
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/ban-ts-comment': 1,
  },
}
