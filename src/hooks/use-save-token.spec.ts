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
import { spyOnUseUser } from "@specs-utils/spy-on-useuser";
import { useUser } from "@/hooks/use-user";

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

	it("should restore token from localStorage and mutate useUser on reopening application", () => {
		spyOnUseUser({
			success: true,
			data: [{ name: "Muhammad Bishram Yashir Alfarizi Aminuddin" }],
		});

		saveAccessToken(accessToken);
		saveRefreshToken(refreshToken);

		expect(getAccessToken()).toBeFalsy();
		expect(getRefreshToken()).toBeFalsy();
		expect(returnAccessToken()).toEqual(accessToken);
		expect(returnRefreshToken()).toEqual(refreshToken);

		customRenderHook(() => {
			useSaveToken();
		});

		expect(useUser().mutateUser).toBeCalledTimes(1);
		expect(getAccessToken()).toEqual(accessToken);
		expect(getRefreshToken()).toEqual(refreshToken);
		expect(returnAccessToken()).toBeFalsy();
		expect(returnRefreshToken()).toBeFalsy();
	});
});
