import { extractCSRFToken } from "@/libs/api/extract-csrf-token";
import { mockAPIArgs } from "@specs-utils/mock-api-args";

describe("extractCSRFToken", () => {
	it("should return cookie", () => {
		const value = "TestVlaue";
		const bearerValue = "Bearer " + value;
		const { req } = mockAPIArgs({
			headers: { "token-csrf": bearerValue },
		});
		expect(extractCSRFToken(req)).toBe(value);
	});
});
