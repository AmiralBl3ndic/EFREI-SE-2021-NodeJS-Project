module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: [
		'prettier',
		'plugin:prettier/recommended',
		'plugin:react/recommended',
	],
	plugins: ['prettier'],
	// add your custom rules here
	rules: {
		'react/react-in-jsx-scope': 'off',
	},
	globals: {
		React: 'writable',
	},
};
