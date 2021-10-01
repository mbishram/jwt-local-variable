import "@testing-library/jest-dom/extend-expect";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);
