import { generateAccessToken } from "@/libs/api/generate-access-token";
import { UserModel } from "@/models/user-model";
import { getTokenData } from "@/libs/api/get-token-data";

describe("Generate Access Token", () => {
	const data = new UserModel({
		name: "Test",
		username: "test",
		email: "email@test.com",
	});

	it("should return nothing on error", async () => {
		// To make it error
		const SECRET = process.env.ACCESS_TOKEN_SECRET_KEY;
		delete process.env.ACCESS_TOKEN_SECRET_KEY;

		const token = await generateAccessToken(data);
		expect(token).toBeFalsy();

		// Return it
		process.env.ACCESS_TOKEN_SECRET_KEY = SECRET;
	});

	it("should be able to generate access token", async () => {
		const token = await generateAccessToken(data);
		const authorization = "Bearer " + token;

		const [success, error] = await getTokenData(
			authorization,
			process?.env?.ACCESS_TOKEN_SECRET_KEY as string
		);
		expect(success).toBeTruthy();
		expect(error).toBeFalsy();
	});
});
