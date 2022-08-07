import {
	processValidationToken,
	ProcessValidationTokenReturnValue,
	VALIDATION_TOKEN_COOKIE_MAX_AGE,
	VALIDATION_TOKEN_COOKIE_NAME,
} from "@/libs/api/process-validation-token";
import { TOKENS_COLLECTION_NAME } from "@/libs/api/is-token-valid";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { ObjectId } from "bson";
import * as cookiesNext from "cookies-next";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import { NextApiRequest, NextApiResponse } from "next";
import { spyOnGetCookie } from "@specs-utils/spy-on-get-cookie";
import { Db } from "mongodb";

describe("Save Validation Token", () => {
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
		expect(tokenRes?.[0]?.validationToken).toBeTruthy();
		expect(tokenRes?.[0]?.createdAt).toBeTruthy();
	};

	const expectTokenNotExist = (tokenRes: any[]) => {
		expect(tokenRes.length).toBe(0);
	};

	const expectCookieIsSet = (
		tokenRes: any[],
		req: NextApiRequest,
		res: NextApiResponse
	) => {
		expect(cookiesNext.setCookie).toHaveBeenLastCalledWith(
			VALIDATION_TOKEN_COOKIE_NAME,
			tokenRes?.[0]?.validationToken,
			{
				res,
				req,
				httpOnly: true,
				secure: true,
				maxAge: VALIDATION_TOKEN_COOKIE_MAX_AGE,
			}
		);
	};

	const expectReturnValue = (
		result: ProcessValidationTokenReturnValue,
		isSuccess = true
	) => {
		if (!isSuccess) {
			expect(result[0]).toBeFalsy();
			expect(result[1]).toBeTruthy();

			return;
		}

		expect(result[0]).toBeTruthy();
		expect(result[1]).toBeFalsy();
	};

	it("should return exception when error is found", async () => {
		jest.spyOn(
			db.collection(TOKENS_COLLECTION_NAME),
			"insertOne"
		).mockImplementation(jest.fn(async () => Promise.reject(new Error())));
		const { req, res } = mockAPIArgs({});

		const token = "TestToken";
		const userId = new ObjectId();
		expectReturnValue(
			await processValidationToken(token, userId, { req, res }),
			false
		);
	});

	it("should create new document on tokens collection and set httpOnly and secure cookie when accessToken is passed and no error", async () => {
		jest.spyOn(cookiesNext, "setCookie").mockImplementation(jest.fn());
		const { req, res } = mockAPIArgs({});

		const token = "TestToken1";

		// User 1 login on Computer 1
		spyOnGetCookie("");
		const userId = new ObjectId();
		expectReturnValue(
			await processValidationToken(token, userId, { req, res })
		);
		const tokenRes = await getTokenCollectionData(userId);
		expectTokenExist(tokenRes, token, userId);
		expectCookieIsSet(tokenRes, req, res);

		// User 2 login on Computer 1
		spyOnGetCookie(tokenRes?.[0]?.validationToken);
		const tokenDiff = "TestToken123";
		const userIdDiff = new ObjectId();
		expectReturnValue(
			await processValidationToken(tokenDiff, userIdDiff, {
				req,
				res,
			})
		);
		const tokenResDiff = await getTokenCollectionData(userIdDiff);
		expectTokenExist(tokenResDiff, tokenDiff, userIdDiff);
		const tokenResAfterUser2 = await getTokenCollectionData(userId);
		expectTokenNotExist(tokenResAfterUser2);

		// User 1 Login again on Computer 1 and then on Computer 2
		spyOnGetCookie("");
		expectReturnValue(
			await processValidationToken(token, userId, { req, res })
		);
		expectReturnValue(
			await processValidationToken(token, userId, { req, res })
		);
		const tokenResSame = await getTokenCollectionData(userId);
		expectTokenExist(tokenResSame, token, userId);

		// User 2 login on Computer 1
		expectReturnValue(
			await processValidationToken(tokenDiff, userIdDiff, {
				req,
				res,
			})
		);
		const tokenResDiffAgain = await getTokenCollectionData(userIdDiff);
		expectTokenExist(tokenResDiffAgain, tokenDiff, userIdDiff);
		const tokenResSameAgain = await getTokenCollectionData(userId);
		expectTokenExist(tokenResSameAgain, token, userId);

		await db.dropCollection(TOKENS_COLLECTION_NAME);
	});
});
