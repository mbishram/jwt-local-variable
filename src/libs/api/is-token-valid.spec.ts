import {
	isTokenValid,
	TOKENS_COLLECTION_NAME,
} from "@/libs/api/is-token-valid";
import { connectToDatabase } from "@/libs/mongodb/setup";

describe("Is Token Valid", () => {
	const token = "token123";
	const validationToken = "validationToken12345";

	beforeEach(async () => {
		const { db } = await connectToDatabase();
		await db
			.collection(TOKENS_COLLECTION_NAME)
			.insertOne({ token, validationToken });
	});

	afterEach(async () => {
		const { db } = await connectToDatabase();
		await db.dropCollection(TOKENS_COLLECTION_NAME);
	});

	it("should return false when token doesn't exist", async () => {
		expect(await isTokenValid()).toBe(false);
		expect(await isTokenValid("fakeToken")).toBe(false);
	});

	it("should return false when token exist but validationToken doesn't match", async () => {
		expect(await isTokenValid(token)).toBe(false);
		expect(await isTokenValid(token, "falseValidationToken")).toBe(false);
	});
	it("should return true if token exist and validationToken match", async () => {
		expect(await isTokenValid(token, validationToken)).toBe(true);
	});
});
