import { saveValidationToken } from "@/libs/api/save-validation-token";
import { TOKENS_COLLECTION_NAME } from "@/libs/api/is-token-valid";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { ObjectId } from "bson";

describe("Save Validation Token", () => {
	it("should create new document on tokens collection when accessToken is passed", async () => {
		let { db } = await connectToDatabase();

		const token = "TestToken";
		const userId = new ObjectId();
		expect(await saveValidationToken(token, userId)).toBeTruthy();

		const tokenRes = await db
			.collection(TOKENS_COLLECTION_NAME)
			.findOne({ token });

		expect(tokenRes?.token).toBe(token);
		expect(tokenRes?.userId).toEqual(userId);
		expect(tokenRes?.validationToken).toBeTruthy();
		expect(tokenRes?.createdAt).toBeTruthy();
	});
});
