module.exports = {
  parserOptions: {
    sourceType: 'module'
  },
  parser: 'babel-eslint', 
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'semi': false
      }
    ],
    'no-console': 'off'
  }
}