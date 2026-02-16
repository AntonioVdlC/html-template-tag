const { defineConfig } = require("eslint/config");

const globals = require("globals");
const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 12,
      sourceType: "module",
      parserOptions: {},
    },

    extends: compat.extends("eslint:recommended", "prettier"),

    rules: {
      "no-console": "error",
    },
  },
]);
