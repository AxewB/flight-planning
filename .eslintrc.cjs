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
    "vue/max-attributes-per-line": ['error', 
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      }],
    "vue/first-attribute-linebreak": ['error',
      {
        singleline: 'ignore',
        multiline: 'below',
      }],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "never",
        "normal": "always",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }],
    "vue/no-unused-vars": ["error", {
      "ignorePattern": "^_"
    }],
    "vue/v-slot-style": ["error", {
      "atComponent": "shorthand",
      "default": "shorthand",
      "named": "shorthand",
    }],
    "vue/v-on-style": ["error", "shorthand"],
    "vue/v-bind-style": ["error", "shorthand", {
      "sameNameShorthand": "ignore" 
    }],
    "vue/v-on-event-hyphenation": ["error", "always", {
      "autofix": false,
      "ignore": []
    }],
    "vue/singleline-html-element-content-newline": ["error", {
      "ignoreWhenNoAttributes": true,
      "ignoreWhenEmpty": true,
      "ignores": ["pre", "textarea", ...INLINE_ELEMENTS],
      "externalIgnores": []
    }]
  },
}
