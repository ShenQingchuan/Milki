module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  extends: [
    '@antfu'
  ],
  rules: {
    'no-console': 'off',
    'curly': 'off',
  }
}
