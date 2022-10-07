import { NextJson } from "@/models/next-json";
import { getTokenData } from "@/libs/api/get-token-data";
import { spyOnIsTokenValid } from "@specs-utils/spy-on-is-token-valid";

describe("Get Token Data", () => {
	describe("on alwaysValid flag false", () => {
		afterEach(() => {
			jest.restoreAllMocks();
		});

		describe("when JWT doesn't exist", () => {
			it("should return error", async () => {
				spyOnIsTokenValid();

				const authorization = "";
				const [data, error] = await getTokenData({
					authorizationHeader: authorization,
					secret: "",
					csrfToken: "",
				});

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
				spyOnIsTokenValid();

				const authorization = "Bearer " + process.env.JWT_VALID_ACCESS;
				const data = { test: "Test Data" };
				const [success, error] = await getTokenData({
					authorizationHeader: authorization,
					secret: process.env.ACCESS_TOKEN_SECRET_KEY as string,
					csrfToken: "",
				});

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
				spyOnIsTokenValid();

				const authorization = "Bearer " + process.env.JWT_EXPIRED;
				const [success, error] = await getTokenData({
					authorizationHeader: authorization,
					secret: process.env.ACCESS_TOKEN_SECRET_KEY as string,
					csrfToken: "",
				});

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
				spyOnIsTokenValid();

				const authorization = "Bearer " + process.env.JWT_INVALID;
				const [success, error] = await getTokenData({
					authorizationHeader: authorization,
					secret: process.env.ACCESS_TOKEN_SECRET_KEY as string,
					csrfToken: "",
				});

				expect(success).toEqual(null);
				expect(error).toEqual(
					new NextJson({
						message: "Invalid token, please login again",
						success: false,
					})
				);
			});
		});

		describe("when JWT doesn't exist on db", () => {
			it("should return error", async () => {
				spyOnIsTokenValid(false);

				const authorization = "Bearer " + process.env.JWT_VALID_ACCESS;
				const [success, error] = await getTokenData({
					authorizationHeader: authorization,
					secret: process.env.ACCESS_TOKEN_SECRET_KEY as string,
					csrfToken: "",
				});

				expect(error).toEqual(
					new NextJson({
						message: "Access denied, token is not valid!",
						success: false,
					})
				);
				expect(success).toEqual(null);
			});
		});
	});

	describe("on alwaysValid flag true", () => {
		describe("when JWT is valid", () => {
			it("should return data", async () => {
				const authorization = "Bearer " + process.env.JWT_VALID_ACCESS;
				const data = { test: "Test Data" };
				const [success, error] = await getTokenData(
					{
						authorizationHeader: authorization,
						secret: process.env.ACCESS_TOKEN_SECRET_KEY as string,
						csrfToken: "",
					},
					{ alwaysValid: true }
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
	});
});
