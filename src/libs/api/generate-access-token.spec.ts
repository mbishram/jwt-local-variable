import { generateAccessToken } from "@/libs/api/generate-access-token";
import { UserModel } from "@/models/user-model";
import { getTokenData } from "@/libs/api/get-token-data";
import { ObjectId } from "bson";
import { spyOnIsTokenValid } from "@specs-utils/spy-on-is-token-valid";

describe("Generate Access Token", () => {
	const data = new UserModel({
		id: new ObjectId("D92A6298709507AAC819F33D"),
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
		spyOnIsTokenValid();

		const token = await generateAccessToken(data);
		const authorization = "Bearer " + token;

		const [success, error] = await getTokenData({
			authorizationHeader: authorization,
			secret: process?.env?.ACCESS_TOKEN_SECRET_KEY as string,
			validationToken: "",
		});
		expect(success).toBeTruthy();
		expect(error).toBeFalsy();

		jest.restoreAllMocks();
	});
});
