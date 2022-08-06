import { saveValidationToken } from "@/libs/api/save-validation-token";
import { TOKENS_COLLECTION_NAME } from "@/libs/api/is-token-valid";
import { connectToDatabase } from "@/libs/mongodb/setup";

describe("Save Validation Token", () => {
	it("should create new document on tokens collection when accessToken is passed", async () => {
		let { db } = await connectToDatabase();

		const token = "TestToken";
		expect(await saveValidationToken(token)).toBeTruthy();

		const tokenRes = await db
			.collection(TOKENS_COLLECTION_NAME)
			.findOne({ token });

		expect(tokenRes?.token).toBe(token);
	});
});
