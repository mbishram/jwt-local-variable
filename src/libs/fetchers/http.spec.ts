/**
 * @jest-environment jsdom
 */

import { httpInstance, httpRefreshInstance } from "@/libs/fetchers/http";
import {
	httpInstanceHandler,
	httpRefreshInstanceHandler,
} from "../../../specs/__mocks__/api/http";
import {
	setAccessToken,
	setCSRFToken,
	setRefreshToken,
} from "@/libs/token/variable-handler";

describe("HTTP", () => {
	const accessToken = "AccessToken";
	const refreshToken = "RefreshToken";
	const csrfToken = "CSRFToken";
	const accessTokenHeader = "Bearer " + accessToken;
	const refreshTokenHeader = "Bearer " + refreshToken;
	const csrfTokenHeader = "Bearer " + csrfToken;

	beforeEach(() => {
		setAccessToken(accessToken);
		setRefreshToken(refreshToken);
		setCSRFToken(csrfToken);
	});

	describe("httpInstance", () => {
		it("should have authorization headers", async () => {
			httpInstanceHandler();
			const res = await httpInstance.get<any>("");
			expect(res?.data?.accessToken).toEqual(accessTokenHeader);
			expect(res?.data?.csrfToken).toEqual(csrfTokenHeader);
		});
	});

	describe("httpRefreshInstance", () => {
		it("should have authorization and token-access headers", async () => {
			httpRefreshInstanceHandler();
			const res = await httpRefreshInstance.get<any>("");
			expect(res?.data?.accessToken).toEqual(accessTokenHeader);
			expect(res?.data?.refreshToken).toEqual(refreshTokenHeader);
			expect(res?.data?.csrfToken).toEqual(csrfTokenHeader);
		});
	});
});
