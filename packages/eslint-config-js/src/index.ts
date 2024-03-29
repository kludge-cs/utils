import type { Linter } from "eslint";

const eslintConfig: Linter.Config = {
	root: true,
	env: {
		commonjs: true,
		es6: true,
		es2021: true,
		node: true
	},
	extends: ["eslint:recommended", "plugin:node/recommended"],
	parserOptions: {
		extraFileExtensions: [".mjs"],
		sourceType: "module",
		ecmaVersion: 6
	},
	rules: {
		"accessor-pairs": "error",
		"array-bracket-newline": "off",
		"array-bracket-spacing": [
			"error",
			"never"
		],
		"array-callback-return": [
			"error",
			{
				"allowImplicit": true,
				"checkForEach": true
			}
		],
		"array-element-newline": "off",
		"arrow-body-style": "off",
		"arrow-parens": [
			"error",
			"always"
		],
		"arrow-spacing": [
			"error",
			{
				"after": true,
				"before": true
			}
		],
		"block-scoped-var": "error",
		"block-spacing": "error",
		"brace-style": [
			"error",
			"1tbs"
		],
		"camelcase": "error",
		"capitalized-comments": "off",
		"comma-dangle": "error",
		"comma-spacing": [
			"error",
			{
				"after": true,
				"before": false
			}
		],
		"comma-style": [
			"error",
			"last"
		],
		"complexity": "error",
		"computed-property-spacing": "error",
		"consistent-return": "off",
		"consistent-this": "error",
		"curly": "error",
		"default-case": "error",
		"default-case-last": "error",
		"default-param-last": "error",
		"dot-location": [
			"error",
			"property"
		],
		"dot-notation": [
			"error",
			{
				"allowKeywords": true
			}
		],
		"eol-last": [
			"error",
			"always"
		],
		"eqeqeq": "error",
		"for-direction": "error",
		"func-call-spacing": "error",
		"func-name-matching": "error",
		"func-names": "error",
		"func-style": [
			"error",
			"declaration"
		],
		"function-call-argument-newline": [
			"error",
			"consistent"
		],
		"function-paren-newline": "off",
		"generator-star-spacing": "error",
		"getter-return": "error",
		"grouped-accessor-pairs": "error",
		"guard-for-in": "warn",
		"id-length": "error",
		"id-match": "error",
		"implicit-arrow-linebreak": "error",
		"indent": [
			"error",
			"tab",
			{"SwitchCase": 1}
		],
		"init-declarations": "off",
		"jsx-quotes": "error",
		"key-spacing": "error",
		"keyword-spacing": [
			"error",
			{
				"after": true,
				"before": true
			}
		],
		"line-comment-position": "warn",
		"linebreak-style": [
			"error",
			"unix"
		],
		"lines-around-comment": "error",
		"lines-between-class-members": [
			"error",
			"always",
			{"exceptAfterSingleLine": true}
		],
		"max-classes-per-file": "error",
		"max-depth": "error",
		"max-len": [
			"error",
			{
				"ignoreComments": true,
				"ignoreTemplateLiterals": true
			}
		],
		"max-lines": "off",
		"max-lines-per-function": "error",
		"max-nested-callbacks": "error",
		"max-params": "off",
		"max-statements": "off",
		"max-statements-per-line": "error",
		"multiline-comment-style": [
			"error",
			"bare-block"
		],
		"multiline-ternary": [
			"error",
			"always-multiline"
		],
		"new-cap": "error",
		"new-parens": "error",
		"newline-per-chained-call": "error",
		"node/no-missing-import": [
			"error",
			{
				"tryExtensions": [
					".js",
					".json",
					"./index.js"
				]
			}
		],
		"node/no-missing-require": [
			"error",
			{
				"tryExtensions": [
					".js",
					".json",
					"./index.js"
				]
			}
		],
		"no-alert": "error",
		"no-array-constructor": "error",
		"no-await-in-loop": "error",
		"no-async-promise-executor": "error",
		"no-bitwise": "error",
		"no-caller": "error",
		"no-compare-neg-zero": "error",
		"no-cond-assign": "error",
		"no-confusing-arrow": "error",
		"no-console": "off",
		"no-constant-condition": [
			"error",
			{"checkLoops": false}
		],
		"no-constructor-return": "error",
		"no-continue": "error",
		"no-control-regex": "error",
		"no-debugger": "error",
		"no-div-regex": "warn",
		"no-duplicate-imports": "error",
		"no-else-return": "error",
		"no-empty-function": "error",
		"no-eval": "off",
		"no-extend-native": "error",
		"no-extra-bind": "error",
		"no-extra-label": "error",
		"no-extra-parens": "error",
		"no-floating-decimal": "error",
		"no-implicit-coercion": "error",
		"no-implicit-globals": "error",
		"no-implied-eval": "error",
		"no-inline-comments": "warn",
		"no-invalid-this": "error",
		"no-irregular-whitespace": "off",
		"no-iterator": "error",
		"no-label-var": "error",
		"no-labels": "error",
		"no-lone-blocks": "error",
		"no-lonely-if": "error",
		"no-loop-func": "error",
		"no-loss-of-precision": "error",
		"no-magic-numbers": "off",
		"no-mixed-operators": "error",
		"no-multi-assign": "error",
		"no-multi-spaces": "error",
		"no-multi-str": "error",
		"no-multiple-empty-lines": "error",
		"no-negated-condition": "off",
		"no-nested-ternary": "error",
		"no-new": "error",
		"no-new-func": "error",
		"no-new-object": "error",
		"no-new-wrappers": "error",
		"no-octal-escape": "error",
		"no-param-reassign": "error",
		"no-plusplus": "error",
		"no-promise-executor-return": "error",
		"no-proto": "error",
		"no-restricted-exports": "error",
		"no-restricted-globals": "error",
		"no-restricted-imports": "error",
		"no-restricted-properties": "error",
		"no-restricted-syntax": "error",
		"no-return-assign": "error",
		"no-return-await": "off",
		"no-script-url": "error",
		"no-self-compare": "error",
		"no-sequences": "error",
		"no-shadow": "error",
		"no-tabs": [
			"error",
			{"allowIndentationTabs": true}
		],
		"no-template-curly-in-string": "warn",
		"no-ternary": "off",
		"no-throw-literal": "error",
		"no-trailing-spaces": "error",
		"no-undef-init": "error",
		"no-undefined": "off",
		"no-underscore-dangle": "error",
		"no-unmodified-loop-condition": "error",
		"no-unneeded-ternary": [
			"error",
			{"defaultAssignment": true}
		],
		"no-unreachable-loop": "error",
		"no-unsafe-negation": [
			"error",
			{"enforceForOrderingRelations": true}
		],
		"no-unused-expressions": "error",
		"no-unused-vars": "error",
		"no-use-before-define": "error",
		"no-useless-backreference": "error",
		"no-useless-call": "error",
		"no-useless-computed-key": "error",
		"no-useless-concat": "error",
		"no-useless-constructor": "error",
		"no-useless-rename": "error",
		"no-useless-return": "error",
		"no-var": "error",
		"no-void": [
			"error",
			{"allowAsStatement": true}
		],
		"no-warning-comments": "warn",
		"no-whitespace-before-property": "error",
		"nonblock-statement-body-position": "error",
		"object-curly-newline": "error",
		"object-curly-spacing": "off",
		"object-property-newline": "off",
		"object-shorthand": [
			"error",
			"properties",
			{"avoidQuotes": true}
		],
		"one-var": "off",
		"one-var-declaration-per-line": "error",
		"operator-assignment": "error",
		"operator-linebreak": [
			"error",
			"before"
		],
		"padded-blocks": [
			"error",
			"never"
		],
		"padding-line-between-statements": "error",
		"prefer-arrow-callback": "error",
		"prefer-const": "error",
		"prefer-destructuring": "off",
		"prefer-exponentiation-operator": "error",
		"prefer-named-capture-group": "off",
		"prefer-numeric-literals": "error",
		"prefer-object-spread": "error",
		"prefer-promise-reject-errors": "error",
		"prefer-regex-literals": "error",
		"prefer-rest-params": "error",
		"prefer-spread": "error",
		"prefer-template": "error",
		"quote-props": "off",
		"quotes": [
			"error",
			"double"
		],
		"radix": "error",
		"require-atomic-updates": "error",
		"require-await": "off",
		"require-unicode-regexp": "off",
		"rest-spread-spacing": "error",
		"semi": "error",
		"semi-spacing": "error",
		"semi-style": [
			"error",
			"last"
		],
		"sort-imports": "error",
		"sort-keys": "off",
		"sort-vars": "error",
		"space-before-blocks": "error",
		"space-before-function-paren": "off",
		"space-in-parens": [
			"error",
			"never"
		],
		"space-infix-ops": "error",
		"space-unary-ops": "error",
		"spaced-comment": [
			"error",
			"always"
		],
		"switch-colon-spacing": "error",
		"symbol-description": "error",
		"template-curly-spacing": [
			"error",
			"never"
		],
		"template-tag-spacing": "error",
		"unicode-bom": [
			"error",
			"never"
		],
		"vars-on-top": "error",
		"wrap-iife": "error",
		"wrap-regex": "off",
		"yield-star-spacing": "error",
		"yoda": [
			"error",
			"never"
		]
	}
};

export = eslintConfig;
