module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'airbnb-base'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        indent: [1, 4],
        'no-else-return': 1,
        semi: [1, 'always'],
        'space-unary-ops': 2,
        'import/extensions': ['warn', {
            js: 'always',
        }],
        'consistent-return': ['off'],
        'no-underscore-dangle': ['off'],
    },
};
