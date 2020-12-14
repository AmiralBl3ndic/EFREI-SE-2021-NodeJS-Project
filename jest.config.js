module.exports = {
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},

	setupFilesAfterEnv: [
		'@testing-library/react/cleanup-after-each',
		'@testing-library/jest-dom/extend-expect',
	],

	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
