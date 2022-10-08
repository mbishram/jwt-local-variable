/**
 * @jest-environment jsdom
 */

import { useSaveToken } from "@/hooks/use-save-token";
import { customRenderHook } from "@specs-utils/custom-render-hook";
import {
	returnAccessToken,
	returnCSRFToken,
	returnRefreshToken,
	saveAccessToken,
	saveCSRFToken,
	saveRefreshToken,
} from "@/libs/token/local-storage-handler";
import {
	getAccessToken,
	getCSRFToken,
	getRefreshToken,
	removeAccessToken,
	removeCSRFToken,
	removeRefreshToken,
	setAccessToken,
	setCSRFToken,
	setRefreshToken,
} from "@/libs/token/variable-handler";
import { spyOnUseUser } from "@specs-utils/spy-on-useuser";
import { useUser } from "@/hooks/use-user";

describe("useSaveToken Hook", () => {
	const accessToken = "accessToken";
	const refreshToken = "refreshToken";
	const csrfToken = "csrfToken";
	it("should save token to localStorage on reload/close application", async () => {
		customRenderHook(() => {
			useSaveToken();
		});

		setAccessToken(accessToken);
		setRefreshToken(refreshToken);
		setCSRFToken(csrfToken);

		expect(returnAccessToken()).toBeFalsy();
		expect(returnRefreshToken()).toBeFalsy();
		expect(returnCSRFToken()).toBeFalsy();
		expect(getAccessToken()).toEqual(accessToken);
		expect(getRefreshToken()).toEqual(refreshToken);
		expect(getCSRFToken()).toEqual(csrfToken);

		// Simulate reload/closing page
		window.dispatchEvent(new Event("beforeunload"));
		removeAccessToken();
		removeRefreshToken();
		removeCSRFToken();

		expect(returnAccessToken()).toEqual(accessToken);
		expect(returnRefreshToken()).toEqual(refreshToken);
		expect(returnCSRFToken()).toEqual(csrfToken);
		expect(getAccessToken()).toBeFalsy();
		expect(getRefreshToken()).toBeFalsy();
		expect(getCSRFToken()).toBeFalsy();
	});

	it("should restore token from localStorage and mutate useUser on reopening application", () => {
		spyOnUseUser({
			success: true,
			data: [{ name: "Muhammad Bishram Yashir Alfarizi Aminuddin" }],
		});

		saveAccessToken(accessToken);
		saveRefreshToken(refreshToken);
		saveCSRFToken(csrfToken);

		expect(getAccessToken()).toBeFalsy();
		expect(getRefreshToken()).toBeFalsy();
		expect(getCSRFToken()).toBeFalsy();
		expect(returnAccessToken()).toEqual(accessToken);
		expect(returnRefreshToken()).toEqual(refreshToken);
		expect(returnCSRFToken()).toEqual(csrfToken);

		customRenderHook(() => {
			useSaveToken();
		});

		expect(useUser().mutateUser).toBeCalledTimes(1);
		expect(getAccessToken()).toEqual(accessToken);
		expect(getRefreshToken()).toEqual(refreshToken);
		expect(getCSRFToken()).toEqual(csrfToken);
		expect(returnAccessToken()).toBeFalsy();
		expect(returnRefreshToken()).toBeFalsy();
		expect(returnCSRFToken()).toBeFalsy();
	});
});
