/** @format */

const path = require('path');

module.exports = {
  plugins: ['vue', 'prettier'],
  extends: ['plugin:vue/recommended', 'airbnb-base', 'prettier'],
  globals: {
    ap: true,
    my: true,
    uni: true,
    getCurrentPages: true,
    vconsole: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    arguments: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '@': path.resolve(__dirname, 'src/'),
            },
            extensions: ['.js', '.vue'],
          }
        }
      },
    },
    'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
        vue: 'never',
      },
    ],
  },
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    es2017: true,
    es2020: true,
    worker: true,
    jest: true,
    jquery: true,
    mongo: true,
  },
};
