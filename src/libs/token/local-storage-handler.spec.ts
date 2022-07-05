/**
 * @jest-environment jsdom
 */

import {
	getAccessToken,
	getRefreshToken,
	JWT_ACCESS_TOKEN_COOKIE,
	JWT_ACCESS_TOKEN_KEY,
	JWT_REFRESH_TOKEN_KEY,
	removeAccessToken,
	removeRefreshToken,
	setAccessToken,
	setRefreshToken,
} from "@/libs/token/local-storage-handler";
import Cookies from "js-cookie";
import { spyOnGetCookie } from "@specs-utils/spy-on-getcookie";

describe("Local Storage Handler", () => {
	beforeEach(() => {
		jest.spyOn(Cookies, "set");
		jest.spyOn(Cookies, "remove");
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("on Access Token", () => {
		beforeEach(() => {
			localStorage.setItem(JWT_ACCESS_TOKEN_KEY, "testloremipsumtoken");
		});

		it("should able to set it", () => {
			localStorage.removeItem(JWT_ACCESS_TOKEN_KEY);

			setAccessToken("test123token");
			expect(Cookies.set).toBeCalledWith(
				JWT_ACCESS_TOKEN_COOKIE,
				"test123token",
				{
					sameSite: "None",
					secure: true,
				}
			);
			const token = localStorage.getItem(JWT_ACCESS_TOKEN_KEY);
			expect(token).toEqual("test123token");
		});

		it("should able to get it", () => {
			spyOnGetCookie("testtoken");
			expect(getAccessToken()).toEqual("testloremipsumtoken");

			localStorage.removeItem(JWT_ACCESS_TOKEN_KEY);
			expect(getAccessToken()).toEqual("testtoken");
		});

		it("should able to remove it", () => {
			expect(getAccessToken()).toEqual("testloremipsumtoken");
			removeAccessToken();
			const token = localStorage.getItem(JWT_ACCESS_TOKEN_KEY);
			expect(token).toBeFalsy();
			expect(Cookies.remove).toBeCalledWith(JWT_ACCESS_TOKEN_COOKIE);
		});
	});

	describe("on Refresh Token", () => {
		beforeEach(() => {
			localStorage.setItem(JWT_REFRESH_TOKEN_KEY, "testrefreshtoken");
		});

		it("should able to set it", () => {
			localStorage.removeItem(JWT_REFRESH_TOKEN_KEY);

			setRefreshToken("refreshtoken");
			const token = localStorage.getItem(JWT_REFRESH_TOKEN_KEY);
			expect(token).toEqual("refreshtoken");
		});

		it("should able to get it", () => {
			expect(getRefreshToken()).toEqual("testrefreshtoken");
		});

		it("should able to remove it", () => {
			expect(getRefreshToken()).toEqual("testrefreshtoken");
			removeRefreshToken();
			const token = localStorage.getItem(JWT_REFRESH_TOKEN_KEY);
			expect(token).toBeFalsy();
		});
	});
});
