module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    jest: true,
    es6: true,
  },
  rules: {
    'no-console': ['error'],

    // [OVERRIDDEN] allow unused function arguments
    // disallow declaration of variables that are not used in the code
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^Promise$',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],

    // [OVERRIDDEN] Allow exporting single non-default export
    // Require modules with a single export to use a default export
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'off',

    // supporting windows
    'linebreak-style': 'off',

    // [OVERRIDDEN] Allow using _id
    // disallow dangling underscores in identifiers
    // https://eslint.org/docs/rules/no-underscore-dangle
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id', '__'],
        allowAfterThis: false,
        allowAfterSuper: false,
        enforceInMethodNames: true,
      },
    ],

    // [OVERRIDDEN] Disallow comma dangle in functions
    // require trailing commas in multiline object literals
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],

    // [OVERRIDDEN] Allow unnamed functions if they are associated with a reference
    // https://eslint.org/docs/rules/func-names
    'func-names': ['warn', 'as-needed'],

    // [OVERRIDDEN] Increase min properties for line breaks in objects
    // https://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 6, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 6, multiline: true, consistent: true },
      ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
      ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
    }],

    // [OVERRIDDEN] allow only in for loops
    // disallow use of unary operators, ++ and --
    // https://eslint.org/docs/rules/no-plusplus
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    // [OVERRIDDEN] Increase max length to 120
    // specify the maximum length of a line in your program
    // https://eslint.org/docs/rules/max-len
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],

    // [OVERRIDDEN] Enforce parens for arrow functions only when there are more than 1 arguments
    // Require parens in arrow functions arguments
    // https://eslint.org/docs/rules/arrow-parens.html
    'arrow-parens': ['error', 'as-needed'],

    // [CUSTOM] Enforce the usage of curly braces in all blocks, even if it is a one line body
    // https://eslint.org/docs/rules/curly
    curly: ['error', 'all'],

    // [CUSTOM] restrict the use of the logJson function.
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.name='logJson']",
        message: 'logJson is not allowed',
      },
      {
        selector: "CallExpression[callee.name='logKeys']",
        message: 'logKeys is not allowed',
      },
    ],

    // [OVERRIDDEN] Restore old behavior of airbnb
    // Allow 2 blank lines at most, no blank line at the begin/end of files
    // https://eslint.org/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0, maxBOF: 0 }],
  },
};
