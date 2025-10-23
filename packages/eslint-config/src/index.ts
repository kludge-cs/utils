import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import pluginN from "eslint-plugin-n";
import tseslint from "typescript-eslint";

export default defineConfig([
  js.configs.recommended,
  pluginN.configs["flat/recommended"],
  ...tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      curly: ["error", "multi-line", "consistent"],
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      "no-var": "error",
      "no-undef-init": "error",
      "no-use-before-define": "error",
      "no-duplicate-imports": "error",
      "no-console": "off",

      "arrow-parens": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "block-spacing": "error",
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "comma-dangle": ["error", "never"],
      "comma-spacing": ["error", { before: false, after: true }],
      "eol-last": ["error", "always"],
      "func-call-spacing": ["error", "never"],
      "keyword-spacing": ["error", { before: true, after: true }],
      "lines-between-class-members": [
        "error",
        "always",
        { exceptAfterSingleLine: true },
      ],
      "object-curly-spacing": ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true }],
      semi: ["error", "always"],
      "space-before-blocks": "error",
      "space-in-parens": ["error", "never"],
      "space-infix-ops": "error",
      "spaced-comment": ["error", "always"],
      "template-curly-spacing": ["error", "never"],
      indent: ["error", "tab", { SwitchCase: 1 }],
      "no-tabs": ["error", { allowIndentationTabs: true }],
      "linebreak-style": ["error", "unix"],
    },
  },

  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    rules: {
      "n/no-missing-import": ["error"],
      "n/no-missing-require": ["error"],
      "n/no-unsupported-features/es-syntax": "off",
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      "@typescript-eslint/explicit-member-accessibility": ["error"],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/require-await": "off",

      "import/no-unresolved": "error",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },

  prettier,

  {
    ignores: [
      "dist/",
      "build/",
      "coverage/",
      "node_modules/",
      "eslint.config.ts",
    ],
  },
]);
