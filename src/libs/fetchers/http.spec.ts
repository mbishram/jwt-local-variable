/**
 * @jest-environment jsdom
 */

import { httpInstance, httpRefreshInstance } from "@/libs/fetchers/http";
import {
	httpInstanceHandler,
	httpRefreshInstanceHandler,
} from "../../../specs/__mocks__/api/http";
import {
	saveAccessToken,
	saveRefreshToken,
} from "@/libs/token/local-storage-handler";
import { FetcherLoginResponseData } from "@/types/libs/mongodb/auth-fetcher";

describe("HTTP", () => {
	const accessToken = "AccessToken";
	const refreshToken = "RefreshToken";
	const accessTokenHeader = "Bearer " + accessToken;
	const refreshTokenHeader = "Bearer " + refreshToken;

	beforeEach(() => {
		saveAccessToken(accessToken);
		saveRefreshToken(refreshToken);
	});

	describe("httpInstance", () => {
		it("should have authorization headers", async () => {
			httpInstanceHandler();
			const res = await httpInstance.get("");
			expect(res?.data).toEqual(accessTokenHeader);
		});
	});

	describe("httpRefreshInstance", () => {
		it("should have authorization and token-access headers", async () => {
			httpRefreshInstanceHandler();
			const res = await httpRefreshInstance.get<FetcherLoginResponseData>(
				""
			);
			expect(res?.data?.accessToken).toEqual(accessTokenHeader);
			expect(res?.data?.refreshToken).toEqual(refreshTokenHeader);
		});
	});
});
