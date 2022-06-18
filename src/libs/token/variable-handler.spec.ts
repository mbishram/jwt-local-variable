/**
 * @jest-environment jsdom
 */

import {
	setAccessToken,
	getAccessToken,
	removeAccessToken,
	setRefreshToken,
	getRefreshToken,
	removeRefreshToken,
} from "@/libs/token/variable-handler";

describe("Variable Handler", () => {
	describe("on Access Token", () => {
		const accessToken = "access-token-lorem";
		it("should able to set, get, and remove it", () => {
			expect(getAccessToken()).toEqual(null);

			setAccessToken(accessToken);
			expect(getAccessToken()).toEqual(accessToken);

			removeAccessToken();
			expect(getAccessToken()).toEqual(null);
		});
	});

	describe("on Refresh Token", () => {
		const refreshToken = "refresh-token-lorem";
		it("should able to set, get, and, remove it it", () => {
			expect(getRefreshToken()).toEqual(null);

			setRefreshToken(refreshToken);
			expect(getRefreshToken()).toEqual(refreshToken);

			removeRefreshToken();
			expect(getRefreshToken()).toEqual(null);
		});
	});
});
