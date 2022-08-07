import { getValidationTokenCookie } from "@/libs/api/get-validation-token-cookie";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import { VALIDATION_TOKEN_COOKIE_NAME } from "@/libs/api/process-validation-token";

describe("getValidationTokenCookie", () => {
	it("should return cookie", () => {
		const value = "Test Vlaue";
		const { req, res } = mockAPIArgs({
			cookies: { [VALIDATION_TOKEN_COOKIE_NAME]: value },
		});
		expect(getValidationTokenCookie(req, res)).toBe(value);
	});
});
