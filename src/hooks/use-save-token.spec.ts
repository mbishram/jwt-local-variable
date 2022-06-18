/**
 * @jest-environment jsdom
 */

import { useSaveToken } from "@/hooks/use-save-token";
import { customRenderHook } from "@specs-utils/custom-render-hook";
import {
	returnAccessToken,
	returnRefreshToken,
	saveAccessToken,
	saveRefreshToken,
} from "@/libs/token/local-storage-handler";
import {
	getAccessToken,
	getRefreshToken,
	removeAccessToken,
	removeRefreshToken,
	setAccessToken,
	setRefreshToken,
} from "@/libs/token/variable-handler";

describe("useSaveToken Hook", () => {
	const accessToken = "accessToken";
	const refreshToken = "refreshToken";
	it("should save token to localStorage on reload/close application", async () => {
		customRenderHook(() => {
			useSaveToken();
		});

		setAccessToken(accessToken);
		setRefreshToken(refreshToken);

		expect(returnAccessToken()).toBeFalsy();
		expect(returnRefreshToken()).toBeFalsy();
		expect(getAccessToken()).toEqual(accessToken);
		expect(getRefreshToken()).toEqual(refreshToken);

		// Simulate reload/closing page
		window.dispatchEvent(new Event("beforeunload"));
		removeAccessToken();
		removeRefreshToken();

		expect(returnAccessToken()).toEqual(accessToken);
		expect(returnRefreshToken()).toEqual(refreshToken);
		expect(getAccessToken()).toBeFalsy();
		expect(getRefreshToken()).toBeFalsy();
	});

	it("should restore token from localStorage on reopening application", () => {
		saveAccessToken(accessToken);
		saveRefreshToken(refreshToken);

		expect(getAccessToken()).toBeFalsy();
		expect(getRefreshToken()).toBeFalsy();
		expect(returnAccessToken()).toEqual(accessToken);
		expect(returnRefreshToken()).toEqual(refreshToken);

		customRenderHook(() => {
			useSaveToken();
		});

		expect(getAccessToken()).toEqual(accessToken);
		expect(getRefreshToken()).toEqual(refreshToken);
		expect(returnAccessToken()).toBeFalsy();
		expect(returnRefreshToken()).toBeFalsy();
	});
});
