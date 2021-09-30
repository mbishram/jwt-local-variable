import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
	testDir: "./specs/e2e",
	globalSetup: "./playwright-setup",
	use: {
		baseURL: process.env.NEXT_PUBLIC_APPLICATION_BASE_URL,
	},
};

export default config;
