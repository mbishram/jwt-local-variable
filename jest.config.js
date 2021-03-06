module.exports = {
	preset: "@shelf/jest-mongodb",
	collectCoverageFrom: [
		"**/*.{js,jsx,ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
	],
	moduleNameMapper: {
		/* Handle CSS imports (with CSS modules)
		https://jestjs.io/docs/webpack#mocking-css-modules */
		"^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

		// Handle CSS imports (without CSS modules)
		"^.+\\.(css|sass|scss)$": "<rootDir>/specs/__mocks__/styleMock.ts",

		/* Handle image imports
		https://jestjs.io/docs/webpack#handling-static-assets */
		"^.+\\.(jpg|jpeg|png|gif|webp|svg)$":
			"<rootDir>/specs/__mocks__/fileMock.ts",

		// Typescript path aliases
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@specs-utils/(.*)$": "<rootDir>/specs/utils/$1",
	},
	testPathIgnorePatterns: [
		"<rootDir>/node_modules/",
		"<rootDir>/.next/",
		"<rootDir>/specs/e2e",
	],
	transform: {
		/* Use babel-jest to transpile tests with the next/babel preset
		https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
		"^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
	},
	transformIgnorePatterns: [
		"/node_modules/",
		"^.+\\.module\\.(css|sass|scss)$",
	],
	globalSetup: "<rootDir>/jest.envSetup.ts",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
