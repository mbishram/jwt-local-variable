import { generateRefreshToken } from "@/libs/api/generate-refresh-token";
import { getTokenData } from "@/libs/api/get-token-data";

describe("Generate Refresh Token", () => {
	it("should return nothing on error", async () => {
		// To make it error
		const SECRET = process.env.REFRESH_TOKEN_SECRET_KEY;
		delete process.env.REFRESH_TOKEN_SECRET_KEY;

		const token = await generateRefreshToken();
		expect(token).toBeFalsy();

		// Return it
		process.env.REFRESH_TOKEN_SECRET_KEY = SECRET;
	});

	it("should be able to generate access token", async () => {
		const token = await generateRefreshToken();
		const authorization = "Bearer " + token;

		const [success, error] = await getTokenData(
			authorization,
			process?.env?.REFRESH_TOKEN_SECRET_KEY as string
		);
		expect(success).toBeTruthy();
		expect(error).toBeFalsy();
	});
});
