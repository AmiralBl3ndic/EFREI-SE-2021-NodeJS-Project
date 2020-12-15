module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true,
	},
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: [
		'prettier',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	plugins: ['prettier', '@typescript-eslint'],
	// add your custom rules here
	rules: {
		'react/react-in-jsx-scope': 'off',
	},
	globals: {
		React: 'writable',
	},
};
