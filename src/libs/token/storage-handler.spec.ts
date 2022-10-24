/**
 * @jest-environment jsdom
 */

import {
	returnAccessToken,
	returnRefreshToken,
	JWT_ACCESS_TOKEN_KEY,
	JWT_REFRESH_TOKEN_COOKIE,
	deleteAccessToken,
	deleteRefreshToken,
	saveAccessToken,
	saveRefreshToken,
	CSRF_TOKEN_KEY,
	saveCSRFToken,
	returnCSRFToken,
	deleteCSRFToken,
	REFRESH_TOKEN_COOKIE_MAX_AGE,
} from "@/libs/token/storage-handler";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import {
	spyOnDeleteCookie,
	spyOnGetCookie,
	spyOnSetCookie,
} from "@specs-utils/spy-on-cookies-next";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

describe("Storage Handler", () => {
	describe("on Access Token", () => {
		beforeEach(() => {
			localStorage.setItem(JWT_ACCESS_TOKEN_KEY, "testloremipsumtoken");
		});

		it("should able to set it", () => {
			localStorage.removeItem(JWT_ACCESS_TOKEN_KEY);

			saveAccessToken("test123token");
			const token = localStorage.getItem(JWT_ACCESS_TOKEN_KEY);
			expect(token).toEqual("test123token");
		});

		it("should able to get it", () => {
			expect(returnAccessToken()).toEqual("testloremipsumtoken");
		});

		it("should able to remove it", () => {
			expect(returnAccessToken()).toEqual("testloremipsumtoken");
			deleteAccessToken();
			const token = localStorage.getItem(JWT_ACCESS_TOKEN_KEY);
			expect(token).toBeFalsy();
		});
	});

	describe("on Refresh Token", () => {
		const { req, res } = mockAPIArgs();

		afterEach(() => {
			jest.restoreAllMocks();
		});

		it("should able to set it", () => {
			spyOnSetCookie();

			const tokenValue = "tokenValue";
			saveRefreshToken(tokenValue, { req, res });
			expect(setCookie).toBeCalledWith(
				JWT_REFRESH_TOKEN_COOKIE,
				tokenValue,
				{
					req,
					res,
					httpOnly: true,
					secure: true,
					maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
				}
			);
		});

		it("should able to get it", () => {
			spyOnGetCookie();
			returnRefreshToken({ req, res });
			expect(getCookie).toBeCalledWith(JWT_REFRESH_TOKEN_COOKIE, {
				req,
				res,
			});
		});

		it("should able to remove it", () => {
			spyOnDeleteCookie();
			deleteRefreshToken({ req, res });
			expect(deleteCookie).toBeCalledWith(JWT_REFRESH_TOKEN_COOKIE, {
				req,
				res,
			});
		});
	});

	describe("on CSRF Token", () => {
		beforeEach(() => {
			localStorage.setItem(CSRF_TOKEN_KEY, "testCSRFToken");
		});

		it("should able to set it", () => {
			localStorage.removeItem(CSRF_TOKEN_KEY);

			saveCSRFToken("csrfToken");
			const token = localStorage.getItem(CSRF_TOKEN_KEY);
			expect(token).toEqual("csrfToken");
		});

		it("should able to get it", () => {
			expect(returnCSRFToken()).toEqual("testCSRFToken");
		});

		it("should able to remove it", () => {
			expect(returnCSRFToken()).toEqual("testCSRFToken");
			deleteCSRFToken();
			const token = localStorage.getItem(CSRF_TOKEN_KEY);
			expect(token).toBeFalsy();
		});
	});
});
