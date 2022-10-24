/**
 * @jest-environment jsdom
 */

import { useSaveToken } from "@/hooks/use-save-token";
import { customRenderHook } from "@specs-utils/custom-render-hook";
import {
	returnAccessToken,
	returnCSRFToken,
	saveAccessToken,
	saveCSRFToken,
} from "@/libs/token/storage-handler";
import {
	getAccessToken,
	getCSRFToken,
	removeAccessToken,
	removeCSRFToken,
	setAccessToken,
	setCSRFToken,
} from "@/libs/token/variable-handler";
import { spyOnUseUser } from "@specs-utils/spy-on-useuser";
import { useUser } from "@/hooks/use-user";

describe("useSaveToken Hook", () => {
	const accessToken = "accessToken";
	const csrfToken = "csrfToken";
	it("should save token to localStorage on reload/close application", async () => {
		customRenderHook(() => {
			useSaveToken();
		});

		setAccessToken(accessToken);
		setCSRFToken(csrfToken);

		expect(returnAccessToken()).toBeFalsy();
		expect(returnCSRFToken()).toBeFalsy();
		expect(getAccessToken()).toEqual(accessToken);
		expect(getCSRFToken()).toEqual(csrfToken);

		// Simulate reload/closing page
		window.dispatchEvent(new Event("beforeunload"));
		removeAccessToken();
		removeCSRFToken();

		expect(returnAccessToken()).toEqual(accessToken);
		expect(returnCSRFToken()).toEqual(csrfToken);
		expect(getAccessToken()).toBeFalsy();
		expect(getCSRFToken()).toBeFalsy();
	});

	it("should restore token from localStorage and mutate useUser on reopening application", () => {
		spyOnUseUser({
			success: true,
			data: [{ name: "Muhammad Bishram Yashir Alfarizi Aminuddin" }],
		});

		saveAccessToken(accessToken);
		saveCSRFToken(csrfToken);

		expect(getAccessToken()).toBeFalsy();
		expect(getCSRFToken()).toBeFalsy();
		expect(returnAccessToken()).toEqual(accessToken);
		expect(returnCSRFToken()).toEqual(csrfToken);

		customRenderHook(() => {
			useSaveToken();
		});

		expect(useUser().mutateUser).toBeCalledTimes(1);
		expect(getAccessToken()).toEqual(accessToken);
		expect(getCSRFToken()).toEqual(csrfToken);
		expect(returnAccessToken()).toBeFalsy();
		expect(returnCSRFToken()).toBeFalsy();
	});
});
