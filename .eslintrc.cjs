module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "import/prefer-default-export": 0,
    "quotes": ["error", "single"],
    "semi": ["error", "never"]
  },
};