/**
 * @jest-environment jsdom
 */

import { login } from "./auth";
import { loginMethodHandler } from "../../../specs/__mocks__/api/authFetcher";

describe("Auth Fetcher", () => {
	describe("on login method", () => {
		const data = { username: "", password: "" };
		it("should pass /auth/login endpoint and data", async () => {
			loginMethodHandler(data);
			const res = await login(data);
			expect(res?.data).toEqual("Success");
		});
	});

	describe("on logout method", () => {
		it.todo("should be able to logout");
	});

	describe("on getUser method", () => {
		it.todo("should be able to get user");
	});
});
