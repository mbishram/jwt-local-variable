import { invalidMethod } from "@/libs/mongodb/quotes-fetcher";
import { NextJson } from "@/classes/next-json";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { mockAPIArgs } from "@specs-utils/mock-api-args";

describe("Fetcher", () => {
	describe("when method is valid", () => {
		afterEach(async () => {
			const { db } = await connectToDatabase();
			await db.dropCollection("users");
		});

		it.todo("should be able to login");
	});

	describe("when method is invalid", () => {
		const { req, res } = mockAPIArgs({ method: "GET" });
		it("should return error message", async () => {
			await invalidMethod(req, res);
			expect(res.setHeader).toBeCalledWith("Allow", ["POST"]);
			expect(res.status).toBeCalledWith(405);
			expect(res.status(501).json).toBeCalledWith(
				new NextJson({
					success: false,
					message: `Method ${req.method} Not Allowed`,
				})
			);
		});
	});
});
