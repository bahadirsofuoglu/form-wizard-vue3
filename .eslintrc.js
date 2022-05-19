module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  plugins: ['spellcheck'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['*.config.js', '/dist/*', 'src/components/datatable/src'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0,
    'no-unused-vars': 'off',
    'comma-dangle': 0,
    'vue/experimental-script-setup-vars': 0,
    'vue/multi-word-component-names': 0,
    'vue/attribute-hyphenation': [
      'error',
      'always',
      {
        ignore: []
      }
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'CONDITIONALS',
          'LIST_RENDERING',
          'OTHER_DIRECTIVES',
          'DEFINITION',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'TWO_WAY_BINDING',
          ['UNIQUE', 'SLOT'],
          'OTHER_ATTR',
          'CONTENT',
          'EVENTS'
        ],
        alphabetical: false
      }
    ],
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'LIFECYCLE_HOOKS',
          'computed',
          'watch',
          'watchQuery',
          'methods',
          ['template', 'render'],
          'renderError'
        ]
      }
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: 'block', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' }
    ]
  }
}
