/**
 * @jest-environment jsdom
 */

import {
	returnAccessToken,
	returnRefreshToken,
	JWT_ACCESS_TOKEN_KEY,
	JWT_REFRESH_TOKEN_KEY,
	deleteAccessToken,
	deleteRefreshToken,
	saveAccessToken,
	saveRefreshToken,
	CSRF_TOKEN_KEY,
	saveCSRFToken,
	returnCSRFToken,
	deleteCSRFToken,
} from "@/libs/token/local-storage-handler";

describe("Local Storage Handler", () => {
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
		beforeEach(() => {
			localStorage.setItem(JWT_REFRESH_TOKEN_KEY, "testrefreshtoken");
		});

		it("should able to set it", () => {
			localStorage.removeItem(JWT_REFRESH_TOKEN_KEY);

			saveRefreshToken("refreshtoken");
			const token = localStorage.getItem(JWT_REFRESH_TOKEN_KEY);
			expect(token).toEqual("refreshtoken");
		});

		it("should able to get it", () => {
			expect(returnRefreshToken()).toEqual("testrefreshtoken");
		});

		it("should able to remove it", () => {
			expect(returnRefreshToken()).toEqual("testrefreshtoken");
			deleteRefreshToken();
			const token = localStorage.getItem(JWT_REFRESH_TOKEN_KEY);
			expect(token).toBeFalsy();
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
