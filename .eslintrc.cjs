module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    semi: 0,
    'comma-dangle': 0,
    '@typescript-eslint/no-empty-function': 0,
  },
};
