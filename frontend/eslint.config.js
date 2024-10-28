// import globals from "globals";
// import tseslint from "typescript-eslint";
// import pluginVue from "eslint-plugin-vue";


// export default [
//   {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
//   {languageOptions: { globals: globals.browser }},
//   ...tseslint.configs.recommended,
//   ...pluginVue.configs["flat/essential"],
//   {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
// ];

import js from '@eslint/js'
import globals from 'globals'
import vue from 'eslint-plugin-vue'
import tseslint from '@typescript-eslint/eslint-plugin'

export default [
  {
    ignores: ['dist'],
  },
  {
    extends: [
      js.configs.recommended,
      'plugin:vue/vue3-recommended', // Configuration pour Vue 3
      'plugin:@typescript-eslint/recommended',
    ],
    files: ['**/*.{ts,tsx,js,vue}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'vue/multi-word-component-names': 'off', // Exemple : désactiver une règle vue
    },
  },
]