import { cleanTokenPayload } from "@/libs/clean-token-payload";

describe("Clean Token Payload", () => {
	it("should return payload without claims", () => {
		const payload = {
			test: "Test Data",
			iss: "ISS",
			sub: "SUB",
			aud: "AUD",
			exp: 100,
			nbf: 200,
			iat: 300,
			jti: "JTI",
		};
		expect(cleanTokenPayload(payload)).toEqual({ test: "Test Data" });
	});
});
