module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //空行最多不能超过20行
    "no-multiple-empty-lines": [0, {"max": 20}],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
