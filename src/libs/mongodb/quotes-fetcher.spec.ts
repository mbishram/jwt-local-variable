import {
	createQuotes,
	deleteQuotes,
	getAllQuotes,
	QUOTES_COLLECTION_NAME,
} from "@/libs/mongodb/quotes-fetcher";
import { NextJson } from "@/models/next-json";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import { spyOnIsTokenValid } from "@specs-utils/spy-on-is-token-valid";
import { ObjectId } from "bson";
import { generateAccessToken } from "@/libs/api/generate-access-token";
import { UserModel } from "@/models/user-model";

describe("Fetcher", () => {
	beforeEach(() => {
		spyOnIsTokenValid();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("when method is valid", () => {
		beforeEach(async () => {
			const { db } = await connectToDatabase();
			await db.createCollection(QUOTES_COLLECTION_NAME);
		});

		afterEach(async () => {
			const { db } = await connectToDatabase();
			await db.dropCollection(QUOTES_COLLECTION_NAME);
		});

		describe("on unauthorized user", () => {
			it("should return 401 when delete all quotes called", async () => {
				const { req, res } = mockAPIArgs({
					method: "POST",
					headers: {
						authorization: "Bearer " + process.env.JWT_INVALID,
					},
				});
				await deleteQuotes(req, res);
				expect(res.status).toBeCalledWith(401);
				expect(res.json).toBeCalledWith(
					new NextJson({
						message: "Invalid token, please login again",
						success: false,
					})
				);
			});

			it("should be able to get all quotes", async () => {
				const { req, res } = mockAPIArgs({
					body: {
						test: "Test1",
					},
				});
				await createQuotes(req, res);

				const { db } = await connectToDatabase();
				const expectedData = await db
					.collection(QUOTES_COLLECTION_NAME)
					.find()
					.toArray();
				const allQuotes = await getAllQuotes();
				expect(allQuotes).toEqual(
					new NextJson({
						message: "Quotes successfully fetched!",
						success: true,
						data: expectedData,
					})
				);
			});

			it("should be able to create quotes", async () => {
				const { req, res } = mockAPIArgs({
					body: {
						test: "Test1",
					},
				});

				await createQuotes(req, res);
				expect(res.json).toBeCalledWith(
					new NextJson({
						message: "Quotes added!",
						success: true,
					})
				);
				expect(res.json).toBeCalledTimes(1);
			});
		});

		describe("on authorized user", () => {
			it("should be able to create quotes with user credential", async () => {
				const headers = {
					authorization: "Bearer " + process.env.JWT_VALID_ACCESS,
				};
				const { req, res } = mockAPIArgs({
					body: {
						test: "Test1",
					},
					headers,
				});

				await createQuotes(req, res);
				expect(res.json).toBeCalledWith(
					new NextJson({
						message: "Quotes added!",
						success: true,
					})
				);
				expect(res.json).toBeCalledTimes(1);
			});

			it("should be able to delete all quotes", async () => {
				const userId = new ObjectId();
				const token = await generateAccessToken(
					new UserModel({
						id: userId,
						name: "Test",
						username: "test",
						email: "email@test.com",
					})
				);
				const headers = {
					authorization: "Bearer " + token,
				};
				const { req: addQuoteReq, res: addQuoteRes } = mockAPIArgs({
					body: {
						test: "Test1",
					},
					headers,
				});
				await createQuotes(addQuoteReq, addQuoteRes);
				await createQuotes(addQuoteReq, addQuoteRes);

				const { db } = await connectToDatabase();
				const initialData = await db
					.collection(QUOTES_COLLECTION_NAME)
					.find()
					.toArray();
				expect(initialData.length).toBe(2);

				const { req, res } = mockAPIArgs({
					headers,
				});

				await deleteQuotes(req, res);

				expect(res.json).toBeCalledWith(
					new NextJson({
						message: "All quotes deleted!",
						success: true,
					})
				);
				expect(res.json).toBeCalledTimes(1);
				const expectedData = await db
					.collection(QUOTES_COLLECTION_NAME)
					.find()
					.toArray();
				expect(expectedData.length).toBe(0);
			});
		});
	});
});
