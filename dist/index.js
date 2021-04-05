"use strict";
const eslintConfig = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.eslint.json",
        ecmaVersion: 2020
    },
    extends: [
        "@kludge-cs/eslint-config-js",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        "curly": [
            "error",
            "multi"
        ],
        "node/no-unsupported-features/es-syntax": "off",
        "node/no-missing-import": [
            "error",
            {
                "tryExtensions": [
                    ".js",
                    ".json",
                    "./index.js",
                    ".ts",
                    "./index.ts"
                ]
            }
        ],
        "node/no-missing-require": [
            "error",
            {
                "tryExtensions": [
                    ".js",
                    ".json",
                    "./index.js",
                    ".ts",
                    "./index.ts"
                ]
            }
        ],
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/ban-ts-comment": [
            "error",
            {
                "minimumDescriptionLength": 3,
                "ts-check": true,
                "ts-expect-error": "allow-with-description",
                "ts-ignore": "allow-with-description",
                "ts-nocheck": true
            }
        ],
        "@typescript-eslint/class-literal-property-style": "error",
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/default-param-last": "error",
        "@typescript-eslint/dot-notation": [
            "error",
            {
                "allowKeywords": true,
                "allowPattern": "(^[A-Z])|(^[a-z]+(_[a-z]+)+$)",
                "allowPrivateClassPropertyAccess": true
            }
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "error",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/init-declarations": [
            "error",
            "never",
            { "ignoreForLoopInit": true }
        ],
        "@typescript-eslint/member-ordering": [
            "error",
            {
                "default": [
                    "signature",
                    "public-instance-field",
                    "protected-instance-field",
                    "private-instance-field",
                    "instance-field",
                    "public-constructor",
                    "protected-constructor",
                    "private-constructor",
                    "constructor",
                    "public-instance-method",
                    "protected-instance-method",
                    "private-instance-method",
                    "instance-method",
                    "public-static-field",
                    "protected-static-field",
                    "private-static-field",
                    "static-field",
                    "public-static-method",
                    "protected-static-method",
                    "private-static-method",
                    "static-method"
                ]
            }
        ],
        "@typescript-eslint/no-base-to-string": "error",
        "@typescript-eslint/no-dupe-class-members": "error",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extra-non-null-assertion": "error",
        "@typescript-eslint/no-extraneous-class": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-implied-eval": "error",
        "@typescript-eslint/no-invalid-this": "error",
        "@typescript-eslint/no-invalid-void-type": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-throw-literal": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/no-unnecessary-qualifier": "error",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-as-const": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-includes": "error",
        "@typescript-eslint/prefer-reduce-type-parameter": "error",
        "@typescript-eslint/prefer-string-starts-ends-with": "error",
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/require-await": "error",
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/switch-exhaustiveness-check": "warn",
        "@typescript-eslint/unbound-method": "error",
        "@typescript-eslint/unified-signatures": "error"
    }
};
module.exports = eslintConfig;
