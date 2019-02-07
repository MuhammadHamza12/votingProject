module.exports = {
    parser: 'babel-eslint',
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      node: true,
      jest: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended','plugin:import/errors','plugin:import/warnings'],
    parserOptions: {
      ecmaFeatures: {
        experimentalObjectRestSpread: true,
        jsx: true,
      },
      sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
      'import/no-unresolved': [2, {commonjs: true, amd: true}],
      'import/named': 2,
      'import/namespace': 2,
      'import/default': 2,
      'import/export': 2,
      'react/prop-types': ['off'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-console': ['warn', { allow: ['info', 'error'] }],
      'arrow-parens': ['error', 'always'],
    },
  };
  