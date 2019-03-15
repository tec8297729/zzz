module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:react/recommended', 'eslint:recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //强制使用单引号
    quotes: ['error', 'single'],
    //强制不使用分号结尾
    // semi: ['error', 'never'],
  },
  // settings: {
  //   "import/resolver": 'webpack',
  // },
  parserOptions: {
    // parser: 'babel-eslint',
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "impliedStrict": true
    }
  }
}
