import { generateRefreshToken } from "@/libs/api/generate-refresh-token";
import { getTokenData } from "@/libs/api/get-token-data";
import { spyOnIsTokenValid } from "@specs-utils/spy-on-is-token-valid";

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
		spyOnIsTokenValid();

		const token = await generateRefreshToken();
		const authorization = "Bearer " + token;

		const [success, error] = await getTokenData({
			authorizationHeader: authorization,
			secret: process?.env?.REFRESH_TOKEN_SECRET_KEY as string,
			validationToken: "",
		});
		expect(success).toBeTruthy();
		expect(error).toBeFalsy();

		jest.restoreAllMocks();
	});
});
