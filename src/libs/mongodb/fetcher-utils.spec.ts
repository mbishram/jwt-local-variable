import { NextJson } from "@/models/next-json";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import { invalidMethod } from "@/libs/mongodb/fetcher-utils";

describe("Fetcher Utils", () => {
	describe("when method is invalid", () => {
		it("should return error message", async () => {
			const { req, res } = mockAPIArgs({ method: "GET" });

			await invalidMethod(req, res, { allowMethod: ["POST"] });
			expect(res.setHeader).toBeCalledWith(
				"Access-Control-Allow-Methods",
				["POST"]
			);
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
