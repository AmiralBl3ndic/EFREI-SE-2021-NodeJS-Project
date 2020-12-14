module.exports = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

	testMatch: ['<rootDir>/pages/*.spec.tsx'],

	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
