const typescriptEslintParser = require("@typescript-eslint/parser");
const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  {
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          varsIgnorePattern: "^_",
        },
      ],
      "no-use-before-define": ["error", { functions: false, classes: true }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": ["error"],
    },
  },
  {
    ignores: ["dist/**", "__coverage__/**"],
  },
];
