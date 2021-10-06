import { loadEnvConfig } from "@next/env";

export default async function jestSetup() {
	const projectDir = process.cwd();
	loadEnvConfig(projectDir);
}
