import { saveValidationToken } from "@/libs/api/save-validation-token";
import { TOKENS_COLLECTION_NAME } from "@/libs/api/is-token-valid";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { ObjectId } from "bson";

describe("Save Validation Token", () => {
	const expectTokenValid = (
		tokenRes: any[],
		token: string,
		userId: ObjectId
	) => {
		expect(tokenRes.length).toBe(1);
		expect(tokenRes?.[0]?.token).toBe(token);
		expect(tokenRes?.[0]?.userId).toEqual(userId);
		expect(tokenRes?.[0]?.validationToken).toBeTruthy();
		expect(tokenRes?.[0]?.createdAt).toBeTruthy();
	};

	it("should create new document on tokens collection when accessToken is passed", async () => {
		let { db } = await connectToDatabase();

		const token = "TestToken1";

		const userId = new ObjectId();
		expect(await saveValidationToken(token, userId)).toBeTruthy();

		const tokenRes = await db
			.collection(TOKENS_COLLECTION_NAME)
			.find({ token })
			.toArray();
		expectTokenValid(tokenRes, token, userId);

		const tokenDiff = "TestToken123";
		const userIdDiff = new ObjectId();
		expect(await saveValidationToken(tokenDiff, userIdDiff)).toBeTruthy();

		const userIdSame = new ObjectId();

		expect(await saveValidationToken(token, userIdSame)).toBeTruthy();
		const tokenResSame = await db
			.collection(TOKENS_COLLECTION_NAME)
			.find({ token })
			.toArray();
		expectTokenValid(tokenResSame, token, userIdSame);

		const tokenResDiff = await db
			.collection(TOKENS_COLLECTION_NAME)
			.find({ token: tokenDiff })
			.toArray();
		expectTokenValid(tokenResDiff, tokenDiff, userIdDiff);

		await db.dropCollection(TOKENS_COLLECTION_NAME);
	});
});
