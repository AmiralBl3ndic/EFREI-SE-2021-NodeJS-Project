module.exports = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

	testMatch: ['<rootDir>/**/*.spec.tsx'],

	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
