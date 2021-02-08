module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    jest: true,
  },
  plugins: ['react', 'import', 'prettier'],
  rules: {
    'max-len': ['error', 100],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-mixed-operators': 'off',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'jsx-a11y/anchor-is-valid': 'off',
    'react/forbid-prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
        printWidth: 100,
      },
    ],
  },
};
