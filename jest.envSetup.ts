import { loadEnvConfig } from "@next/env";
const jestMongoSetup = require("@shelf/jest-mongodb/setup");

export default async function jestSetup() {
	const projectDir = process.cwd();
	loadEnvConfig(projectDir);
	await jestMongoSetup();
}
