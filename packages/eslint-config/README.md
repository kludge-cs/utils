# @kludge-cs/ts-eslint-config

ESLint configuration used in TypeScript based KCS projects.

Note that this also requires a `tsconfig.eslint.json` file to extend the base
`tsconfig` for the package. The only thing this needs to have is an `include`
directive, specifying the files and directories where linting is permitted,
like so:

```json
{
  "extends": "./tsconfig.json",
  "include": ["src", "test"]
}
```
