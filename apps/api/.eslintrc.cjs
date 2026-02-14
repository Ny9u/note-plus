module.exports = {
  extends: ['../../.eslintrc.cjs'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
    // Enable decorator support
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
  },
  rules: {
    // Async function return type check
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],

    // Allow explicit any in some cases (NestJS sometimes requires it)
    '@typescript-eslint/no-explicit-any': 'warn',
  },
}
