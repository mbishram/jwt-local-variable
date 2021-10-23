import {
	createQuotes,
	getAllQuotes,
	invalidMethod,
} from "@/libs/mongodb/fetcher";
import { NextApiRequest, NextApiResponse } from "next";
import { NextJson } from "@/classes/next-json";
import { connectToDatabase } from "@/libs/mongodb/setup";

describe("Fetcher", () => {
	describe("when method is valid", () => {
		afterEach(async () => {
			const { db } = await connectToDatabase();
			await db.dropCollection("quotes");
		});

		it("should be able to create quotes", async () => {
			const req = {
				body: {
					test: "Test1",
				},
			} as NextApiRequest;
			const res = {
				status: jest.fn(() => ({
					json: jest.fn(),
				})),
				json: jest.fn(),
			} as unknown as NextApiResponse;

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
			const req = {
				body: {
					test: "Test1",
				},
			} as NextApiRequest;
			const res = {
				status: jest.fn(() => ({
					json: jest.fn(),
				})),
				json: jest.fn((result) => result),
			} as unknown as NextApiResponse;

			await createQuotes(req, res);

			const { db } = await connectToDatabase();
			const expectedData = await db.collection("quotes").find().toArray();
			await getAllQuotes(req, res);
			expect(res.json).toBeCalledWith(
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
			const json = jest.fn();

			const req = {
				method: "PUT",
			} as NextApiRequest;
			const res = {
				status: jest.fn(() => ({
					json,
				})),
				setHeader: jest.fn(),
			} as unknown as NextApiResponse;

			await invalidMethod(req, res);
			expect(res.setHeader).toBeCalledWith("Allow", ["GET", "POST"]);
			expect(res.status).toBeCalledWith(405);
			expect(json).toBeCalledWith(
				new NextJson({
					success: false,
					message: `Method ${req.method} Not Allowed`,
				})
			);
		});
	});
});
