import { checkAuth } from "@/libs/api/check-auth";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import { NextJson } from "@/classes/next-json";

describe("Check Auth", () => {
	describe("when JWT doesn't exist", () => {
		it("should return error", async () => {
			const authorization = "";
			const { req, res } = mockAPIArgs({
				headers: { authorization },
			});
			const [data, error] = await checkAuth(req, res);

			expect(data).toEqual(null);
			expect(error).toBeTruthy();
			expect(res.status).toBeCalledWith(401);
			expect(res.json).toBeCalledWith(
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
			const { req, res } = mockAPIArgs({
				headers: { authorization },
			});
			const [data, error] = await checkAuth(req, res);

			expect(error).toEqual(null);
			expect(data).toBeTruthy();
			expect(res.status).toBeCalledWith(200);
			expect(res.json).toBeCalledWith(
				new NextJson({
					data: [{ test: "Test Data" }],
					message: "JWT Valid",
					success: true,
				})
			);
		});
	});

	describe("when JWT is expired", () => {
		it("should return error", async () => {
			const authorization = "Bearer " + process.env.JWT_EXPIRED;
			const { req, res } = mockAPIArgs({
				headers: { authorization },
			});
			const [data, error] = await checkAuth(req, res);

			expect(data).toEqual(null);
			expect(error).toBeTruthy();
			expect(res.status).toBeCalledWith(401);
			expect(res.json).toBeCalledWith(
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
			const { req, res } = mockAPIArgs({
				headers: { authorization },
			});
			const [data, error] = await checkAuth(req, res);

			expect(data).toEqual(null);
			expect(error).toBeTruthy();
			expect(res.status).toBeCalledWith(401);
			expect(res.json).toBeCalledWith(
				new NextJson({
					message: "Invalid token, please login again",
					success: false,
				})
			);
		});
	});

	describe("when JWT is error", () => {
		it("should return error", async () => {
			const authorization = "Bearer " + process.env.JWT_ERROR;
			const { req, res } = mockAPIArgs({
				headers: { authorization },
			});
			const [data, error] = await checkAuth(req, res);

			expect(data).toEqual(null);
			expect(error).toBeTruthy();
			expect(res.status).toBeCalledWith(400);
			expect(res.json).toBeCalledWith(
				new NextJson({
					message:
						"There is something wrong with the token, please login again",
					success: false,
				})
			);
		});
	});
});
