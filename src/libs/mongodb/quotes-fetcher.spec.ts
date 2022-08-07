import {
	createQuotes,
	getAllQuotes,
	QUOTES_COLLECTION_NAME,
} from "@/libs/mongodb/quotes-fetcher";
import { NextJson } from "@/models/next-json";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import { spyOnIsTokenValid } from "@specs-utils/spy-on-is-token-valid";

describe("Fetcher", () => {
	beforeEach(() => {
		spyOnIsTokenValid();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("when method is valid", () => {
		describe("on unauthorized user", () => {
			it("should return 401", async () => {
				const { req, res } = mockAPIArgs({
					method: "POST",
					headers: {
						authorization: "Bearer " + process.env.JWT_INVALID,
					},
				});
				await createQuotes(req, res);
				expect(res.status).toBeCalledWith(401);
				expect(res.json).toBeCalledWith(
					new NextJson({
						message: "Invalid token, please login again",
						success: false,
					})
				);
			});
		});

		describe("on authorized user", () => {
			afterEach(async () => {
				const { db } = await connectToDatabase();
				await db.dropCollection(QUOTES_COLLECTION_NAME);
			});

			const headers = {
				authorization: "Bearer " + process.env.JWT_VALID_ACCESS,
			};

			it("should be able to create quotes", async () => {
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

			it("should be able to get all quotes", async () => {
				const { req, res } = mockAPIArgs({
					body: {
						test: "Test1",
					},
					headers,
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
		});
	});
});
