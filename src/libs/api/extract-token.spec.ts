import { extractToken } from "@/libs/api/extract-token";

describe("Extract Token", () => {
	describe("when given valid format", () => {
		it("should return token", () => {
			const authorizationHeader = "Bearer Token123";
			const token = extractToken(authorizationHeader);
			expect(token).toBe("Token123");
		});
	});

	describe("when given invalid format", () => {
		it("should return empty string", () => {
			const authorizationHeader = "Token123 Bearer";
			const token = extractToken(authorizationHeader);
			expect(token).toBe("");
		});
	});
});
