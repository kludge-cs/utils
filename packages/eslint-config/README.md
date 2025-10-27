# @kludge-cs/eslint-config

ESLint configuration used in JavaScript and TypeScript based KCS projects.

## Usage

TypeScript-based projects require a `tsconfig.eslint.json`.

```jsonc
{
  "extends": "./tsconfig.json",
  "include": ["src", "test"],
}
```
