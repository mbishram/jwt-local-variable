import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

axios.defaults.adapter = require("axios/lib/adapters/http");

// NextJS Router setup
import mockRouter from "next-router-mock";
import {
	removeAccessToken,
	removeRefreshToken,
} from "@/libs/token/local-storage-handler";
jest.mock("next/router", () => require("next-router-mock"));

beforeEach(() => {
	mockRouter.setCurrentUrl("/initial");

	// If environment is jsdom
	if (typeof window !== "undefined") {
		removeAccessToken();
		removeRefreshToken();
	}
});
