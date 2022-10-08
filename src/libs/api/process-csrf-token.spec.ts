import {
	processCSRFToken,
	ProcessCSRFTokenReturnValue,
} from "@/libs/api/process-csrf-token";
import { TOKENS_COLLECTION_NAME } from "@/libs/api/is-token-valid";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { ObjectId } from "bson";
import { Db } from "mongodb";
import { spyOnGetCSRFToken } from "@specs-utils/spy-on-get-csrf-token";
import { spyOnSetCSRFToken } from "@specs-utils/spy-on-set-csrf-token";
import { spyOnMongoDBCollection } from "@specs-utils/spy-on-mongodb-collection";

describe("Save CSRF Token", () => {
	let db: Db;

	beforeEach(async () => {
		const { db: beforeAllDb } = await connectToDatabase();
		db = beforeAllDb;
	});

	afterEach(async () => {
		jest.restoreAllMocks();
	});

	const getTokenCollectionData = async (userId: ObjectId) => {
		return await db
			.collection(TOKENS_COLLECTION_NAME)
			.find({ userId })
			.toArray();
	};

	const expectTokenExist = (
		tokenRes: any[],
		token: string,
		userId: ObjectId
	) => {
		expect(tokenRes.length).toBe(1);
		expect(tokenRes?.[0]?.token).toBe(token);
		expect(tokenRes?.[0]?.userId).toEqual(userId);
		expect(tokenRes?.[0]?.csrfToken).toBeTruthy();
		expect(tokenRes?.[0]?.createdAt).toBeTruthy();
	};

	const expectTokenNotExist = (tokenRes: any[]) => {
		expect(tokenRes.length).toBe(0);
	};

	const expectReturnValue = (
		result: ProcessCSRFTokenReturnValue,
		isSuccess = true
	) => {
		if (!isSuccess) {
			expect(result[0]).toBeFalsy();
			expect(result[1]).toBeTruthy();

			return;
		}

		expect(result[0]).toBeTruthy();
		expect(typeof result[0]).toEqual("string");
		expect(result[1]).toBeFalsy();
	};

	it("should return exception when error is found", async () => {
		spyOnMongoDBCollection(
			db,
			["insertOne"],
			jest.fn(async () => Promise.reject(new Error()))
		);

		const token = "TestToken";
		const userId = new ObjectId();
		expectReturnValue(await processCSRFToken(token, userId), false);
	});

	it("should create new document on tokens collection and set CSRF token when accessToken is passed and no error", async () => {
		spyOnSetCSRFToken();

		const token = "TestToken1";

		// User 1 login on Computer 1
		spyOnGetCSRFToken("");
		const userId = new ObjectId();
		expectReturnValue(await processCSRFToken(token, userId));
		const tokenRes = await getTokenCollectionData(userId);
		expectTokenExist(tokenRes, token, userId);

		// User 2 login on Computer 1
		spyOnGetCSRFToken(tokenRes?.[0]?.csrfToken);
		const tokenDiff = "TestToken123";
		const userIdDiff = new ObjectId();
		expectReturnValue(await processCSRFToken(tokenDiff, userIdDiff));
		const tokenResDiff = await getTokenCollectionData(userIdDiff);
		expectTokenExist(tokenResDiff, tokenDiff, userIdDiff);
		const tokenResAfterUser2 = await getTokenCollectionData(userId);
		expectTokenNotExist(tokenResAfterUser2);

		// User 1 Login again on Computer 1 and then on Computer 2
		expectReturnValue(await processCSRFToken(token, userId));
		expectReturnValue(await processCSRFToken(token, userId));
		const tokenResSame = await getTokenCollectionData(userId);
		expectTokenExist(tokenResSame, token, userId);

		// User 2 login on Computer 1
		expectReturnValue(await processCSRFToken(tokenDiff, userIdDiff));
		const tokenResDiffAgain = await getTokenCollectionData(userIdDiff);
		expectTokenExist(tokenResDiffAgain, tokenDiff, userIdDiff);
		const tokenResSameAgain = await getTokenCollectionData(userId);
		expectTokenExist(tokenResSameAgain, token, userId);

		await db.dropCollection(TOKENS_COLLECTION_NAME);
	});
});
