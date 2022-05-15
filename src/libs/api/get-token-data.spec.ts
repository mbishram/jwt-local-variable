import { NextJson } from "@/models/next-json";
import { getTokenData } from "@/libs/api/get-token-data";

describe("Get Token Data", () => {
	describe("when JWT doesn't exist", () => {
		it("should return error", async () => {
			const authorization = "";
			const [data, error] = await getTokenData(authorization, "");

			expect(data).toEqual(null);
			expect(error).toEqual(
				new NextJson({
					message: "Access denied, token is missing!",
					success: false,
				})
			);
		});
	});

	describe("when JWT is valid", () => {
		it("should return data", async () => {
			const authorization = "Bearer " + process.env.JWT_VALID;
			const data = { test: "Test Data" };
			const [success, error] = await getTokenData(
				authorization,
				process.env.ACCESS_TOKEN_SECRET_KEY as string
			);

			expect(error).toEqual(null);
			expect(success).toEqual(
				new NextJson({
					message: "JWT Valid",
					success: true,
					data: [data],
				})
			);
		});
	});

	describe("when JWT is expired", () => {
		it("should return error", async () => {
			const authorization = "Bearer " + process.env.JWT_EXPIRED;
			const [success, error] = await getTokenData(
				authorization,
				process.env.ACCESS_TOKEN_SECRET_KEY as string
			);

			expect(success).toEqual(null);
			expect(error).toEqual(
				new NextJson({
					message: "Session timed out, please login again",
					success: false,
				})
			);
		});
	});

	describe("when JWT is invalid", () => {
		it("should return error", async () => {
			const authorization = "Bearer " + process.env.JWT_INVALID;
			const [success, error] = await getTokenData(
				authorization,
				process.env.ACCESS_TOKEN_SECRET_KEY as string
			);

			expect(success).toEqual(null);
			expect(error).toEqual(
				new NextJson({
					message: "Invalid token, please login again",
					success: false,
				})
			);
		});
	});
});
