import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module' },
    },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    // Vendored React Bits components keep their upstream code. They update a
    // "latest settings" ref during render and set state from effects (both safe
    // in React 19 without the React Compiler), which the compiler-oriented rules reject.
    files: ['src/components/reactbits/**/*.jsx'],
    rules: { 'react-hooks/refs': 'off', 'react-hooks/set-state-in-effect': 'off' },
  },
  {
    // Build tooling runs in Node, not the browser.
    files: ['vite.config.js', 'eslint.config.js', 'build/**/*.js'],
    languageOptions: { globals: globals.node },
  },
];
