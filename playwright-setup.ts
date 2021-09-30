import { loadEnvConfig } from "@next/env";

export default async function playwrightSetup() {
	/**
	 * Load env variable into test
	 */
	const projectDir = process.cwd();
	loadEnvConfig(projectDir);
}
