import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

axios.defaults.adapter = require("axios/lib/adapters/http");

// NextJS Router setup
import mockRouter from "next-router-mock";
import {
	deleteAccessToken,
	deleteCSRFToken,
} from "@/libs/token/storage-handler";
import {
	removeAccessToken,
	removeCSRFToken,
} from "@/libs/token/variable-handler";
jest.mock("next/router", () => require("next-router-mock"));

beforeEach(() => {
	jest.restoreAllMocks();
	mockRouter.setCurrentUrl("/initial");

	// If environment is jsdom
	if (typeof window !== "undefined") {
		deleteAccessToken();
		deleteCSRFToken();
		removeAccessToken();
		removeCSRFToken();
	}
});
