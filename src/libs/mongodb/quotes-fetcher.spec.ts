import {
	createQuotes,
	getAllQuotes,
	invalidMethod,
} from "@/libs/mongodb/quotes-fetcher";
import { NextJson } from "@/models/next-json";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { mockAPIArgs } from "@specs-utils/mock-api-args";

describe("Fetcher", () => {
	describe("when method is valid", () => {
		afterEach(async () => {
			const { db } = await connectToDatabase();
			await db.dropCollection("quotes");
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

		it("should be able to get all quotes", async () => {
			const { req, res } = mockAPIArgs({
				body: {
					test: "Test1",
				},
			});
			await createQuotes(req, res);

			const { db } = await connectToDatabase();
			const expectedData = await db.collection("quotes").find().toArray();
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

	describe("when method is invalid", () => {
		it("should return error message", async () => {
			const { req, res } = mockAPIArgs({ method: "GET" });

			await invalidMethod(req, res);
			expect(res.setHeader).toBeCalledWith("Allow", ["POST"]);
			expect(res.status).toBeCalledWith(405);
			expect(res.status(405).json).toBeCalledWith(
				new NextJson({
					success: false,
					message: `Method ${req.method} Not Allowed`,
				})
			);
		});
	});
});