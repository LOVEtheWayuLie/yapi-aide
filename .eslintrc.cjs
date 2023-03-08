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
    /** 关闭方法名前必须有空格 */
    'space-before-function-paren': 0,
    /** 允许any */
    '@typescript-eslint/no-explicit-any': 0,
    /** 变量后边换行 */
    'newline-after-var': 1,
  },
};
