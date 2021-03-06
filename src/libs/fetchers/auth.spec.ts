/**
 * @jest-environment jsdom
 */

import { getToken, login } from "./auth";
import {
	getTokenMethodHandler,
	loginMethodHandler,
} from "../../../specs/__mocks__/api/auth-fetcher";

describe("Auth Fetcher", () => {
	describe("on login method", () => {
		const data = { username: "", password: "" };
		it("should pass /auth/login endpoint and data", async () => {
			loginMethodHandler(data);
			const res = await login(data);
			expect(res?.data).toEqual("Success");
		});
	});

	describe("on get token method", () => {
		it("should pass /auth/get-token endpoint", async () => {
			getTokenMethodHandler();
			const res = await getToken();
			expect(res?.data).toEqual("Success");
		});
	});
});
