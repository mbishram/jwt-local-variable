/**
 * @jest-environment jsdom
 */

import { userExceptionHandler } from "../../specs/__mocks__/api/user";
import {
	getTokenExceptionHandler,
	getTokenHandler,
} from "../../specs/__mocks__/api/get-token";
import { customRenderHook } from "@specs-utils/custom-render-hook";
import { getAccessToken, getRefreshToken } from "@/libs/token/variable-handler";
import { useRefreshToken } from "@/hooks/use-refresh-token";

describe("useRefreshToken Hook", () => {
	describe("should try to fetch new token on user fetch failed", () => {
		it("on fetch new token failed", async () => {
			const userCall = userExceptionHandler();
			const tokenCall = getTokenExceptionHandler();

			const { waitFor } = customRenderHook(() => useRefreshToken());
			await waitFor(() => {
				expect(userCall.isDone()).toBeTruthy();
				expect(tokenCall.isDone()).toBeTruthy();
			});

			expect(getAccessToken()).toBeFalsy();
			expect(getRefreshToken()).toBeFalsy();
		});

		it("on fetch new token success", async () => {
			const userCall = userExceptionHandler();
			const tokenCall = getTokenHandler();

			const { waitFor } = customRenderHook(() => useRefreshToken());
			await waitFor(() => {
				expect(userCall.isDone()).toBeTruthy();
				expect(tokenCall.isDone()).toBeTruthy();
			});

			expect(getAccessToken()).toEqual("Access Token");
			expect(getRefreshToken()).toEqual("Refresh Token");
		});
	});
});
