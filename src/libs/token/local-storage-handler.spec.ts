/**
 * @jest-environment jsdom
 */

import {
	getAccessToken,
	getRefreshToken,
	JWT_ACCESS_TOKEN_KEY,
	JWT_REFRESH_TOKEN_KEY,
	removeAccessToken,
	removeRefreshToken,
	setAccessToken,
	setRefreshToken,
} from "@/libs/token/local-storage-handler";

describe("Local Storage Handler", () => {
	describe("on Access Token", () => {
		beforeEach(() => {
			localStorage.setItem(JWT_ACCESS_TOKEN_KEY, "testloremipsumtoken");
		});

		it("should able to set it", () => {
			localStorage.removeItem(JWT_ACCESS_TOKEN_KEY);

			setAccessToken("test123token");
			const token = localStorage.getItem(JWT_ACCESS_TOKEN_KEY);
			expect(token).toEqual("test123token");
		});

		it("should able to get it", () => {
			expect(getAccessToken()).toEqual("testloremipsumtoken");
		});

		it("should able to remove it", () => {
			expect(getAccessToken()).toEqual("testloremipsumtoken");
			removeAccessToken();
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
