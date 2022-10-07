import { getCSRFTokenCookie } from "@/libs/api/get-csrf-token-cookie";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import { CSRF_TOKEN_COOKIE_NAME } from "@/libs/api/process-csrf-token";

describe("getCSRFTokenCookie", () => {
	it("should return cookie", () => {
		const value = "Test Vlaue";
		const { req, res } = mockAPIArgs({
			cookies: { [CSRF_TOKEN_COOKIE_NAME]: value },
		});
		expect(getCSRFTokenCookie(req, res)).toBe(value);
	});
});
