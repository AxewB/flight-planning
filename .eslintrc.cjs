/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "vue/html-indent": ["error", 2], // html tabulation
    "indent": ["error", 2], // js tabulation
    "vue/max-attributes-per-line": [
      'error', 
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    "vue/first-attribute-linebreak": [
      'error',
      {
        singleline: 'ignore',
        multiline: 'below',
      },
    ],
  },
}
