/**
 * @jest-environment jsdom
 */

import { customRenderHook } from "@specs-utils/custom-render-hook";
import { useSetCookie } from "@/hooks/use-set-cookie";

describe("useSetCookie Hook", () => {
	const cookie = "testCookie=Cookie Get!";

	it("should set cookie for testing", async () => {
		customRenderHook(() => {
			useSetCookie();
		});

		expect(document.cookie).toEqual(cookie);
	});
});
