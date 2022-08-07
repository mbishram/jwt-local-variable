import { NextJson } from "@/models/next-json";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import bcrypt from "bcryptjs";
import {
	getToken,
	getUser,
	login,
	USERS_COLLECTION_NAME,
} from "@/libs/mongodb/auth-fetcher";
import { aesEncrypt } from "@/libs/aes";
import { UserModel } from "@/models/user-model";
import { generateAccessToken } from "@/libs/api/generate-access-token";
import { generateRefreshToken } from "@/libs/api/generate-refresh-token";
import { FetcherLoginResponseData } from "@/types/libs/mongodb/auth-fetcher";
import { ObjectId } from "bson";
import {
	spyOnProcessValidationToken,
	spyOnProcessValidationTokenFailedResponse,
} from "@specs-utils/spy-on-process-validation-token";

describe("Fetcher", () => {
	const tokenPayload = { test: "Test Data" } as unknown as UserModel;

	describe("when login method is called", () => {
		let id: ObjectId;
		const username = process.env.NEXT_PUBLIC_USER || "username";
		const email = process.env.NEXT_PUBLIC_EMAIL || "email@test.com";
		const password = process.env.NEXT_PUBLIC_PASS || "password";
		const name = process.env.NEXT_PUBLIC_NAME || "UserModel Name";

		beforeEach(async () => {
			const { db } = await connectToDatabase();
			await db.collection(USERS_COLLECTION_NAME).insertOne({
				username,
				email,
				name,
				password: await bcrypt.hash(
					password,
					Number(process.env.SALT_ROUND_BE)
				),
			});

			const userRes = await db
				.collection(USERS_COLLECTION_NAME)
				.findOne({ username });
			if (userRes) {
				id = userRes._id;
			}
		});

		afterEach(async () => {
			const { db } = await connectToDatabase();
			await db.dropCollection(USERS_COLLECTION_NAME);
		});

		it("should be rejected on incorrect username", async () => {
			const { req, res } = mockAPIArgs({
				body: { username: "", password: "" },
			});
			await login(req, res);
			expect(res.status).toBeCalledWith(401);
			expect(res.json).toBeCalledWith(
				new NextJson({
					success: false,
					message: "Login failed! User was not found.",
				})
			);
		});

		it("should be rejected on incorrect password", async () => {
			const { req, res } = mockAPIArgs({
				body: { username, password: "" },
			});
			await login(req, res);
			expect(res.status).toBeCalledWith(401);
			expect(res.json).toBeCalledWith(
				new NextJson({
					success: false,
					message: "Login failed! Check your username and password.",
				})
			);
		});

		it("should be rejected on validation token failed to generate", async () => {
			spyOnProcessValidationToken(false);
			const { req, res } = mockAPIArgs({
				body: {
					username,
					password: aesEncrypt(password),
				},
			});
			await login(req, res);

			expect(res.status).toBeCalledWith(500);
			expect(res.json).toBeCalledWith(
				spyOnProcessValidationTokenFailedResponse
			);

			jest.restoreAllMocks();
		});

		it("should be able to login and generate validationToken on correct credential", async () => {
			spyOnProcessValidationToken();

			const { req, res } = mockAPIArgs({
				body: {
					username,
					password: aesEncrypt(password),
				},
			});
			await login(req, res);

			const user = new UserModel({
				id,
				username,
				email,
				name,
			});
			const accessToken = await generateAccessToken(user);
			const refreshToken = await generateRefreshToken();

			expect(res.json).toBeCalledWith(
				new NextJson<FetcherLoginResponseData>({
					success: true,
					message: "Login success!",
					data: [{ accessToken, refreshToken }],
				})
			);

			jest.restoreAllMocks();
		});
	});

	describe("when getUser method is called", () => {
		describe("on invalid/missing access token", () => {
			it("should be rejected", async () => {
				const { req, res } = mockAPIArgs({
					headers: { authorization: "invalid" },
				});

				await getUser(req, res);

				expect(res.status).toBeCalledTimes(1);
				expect(res.status).toBeCalledWith(200);
				expect(res.json).toBeCalledTimes(1);
				expect(res.json).toBeCalledWith(
					new NextJson({
						success: false,
						message: "Failed to fetch user! Token is invalid",
					})
				);
			});
		});

		describe("on valid access token", () => {
			it("should return user info", async () => {
				const authorization = "Bearer " + process.env.JWT_VALID_ACCESS;

				const { req, res } = mockAPIArgs({
					headers: { authorization },
				});

				await getUser(req, res);

				expect(res.status).toBeCalledTimes(1);
				expect(res.status).toBeCalledWith(200);
				expect(res.json).toBeCalledTimes(1);
				expect(res.json).toBeCalledWith(
					new NextJson({
						success: true,
						message: "Get user success!",
						data: [tokenPayload],
					})
				);
			});
		});
	});

	describe("when getToken method is called", () => {
		describe("on invalid/missing refresh token", () => {
			it("should be rejected", async () => {
				const { req, res } = mockAPIArgs({
					headers: { authorization: "invalid" },
				});

				await getToken(req, res);

				expect(res.status).toBeCalledTimes(1);
				expect(res.status).toBeCalledWith(401);
				expect(res.json).toBeCalledTimes(1);
				expect(res.json).toBeCalledWith(
					new NextJson({
						success: false,
						message: "Failed to generate token! Token is invalid",
					})
				);
			});
		});

		describe("on valid refresh token", () => {
			it("should be rejected when validation token failed to generate", async () => {
				spyOnProcessValidationToken(false);

				const authorization = "Bearer " + process.env.JWT_VALID_REFRESH;
				const headerAccessToken = "Bearer " + process.env.JWT_EXPIRED;

				const { req, res } = mockAPIArgs({
					headers: {
						authorization,
						"token-access": headerAccessToken,
					},
				});

				await getToken(req, res);

				expect(res.status).toBeCalledWith(500);
				expect(res.json).toBeCalledWith(
					spyOnProcessValidationTokenFailedResponse
				);

				jest.restoreAllMocks();
			});

			it("should return the new access token", async () => {
				spyOnProcessValidationToken();

				const authorization = "Bearer " + process.env.JWT_VALID_REFRESH;
				const headerAccessToken = "Bearer " + process.env.JWT_EXPIRED;
				const accessToken = await generateAccessToken(tokenPayload);
				const refreshToken = await generateRefreshToken();

				const { req, res } = mockAPIArgs({
					headers: {
						authorization,
						"token-access": headerAccessToken,
					},
				});

				await getToken(req, res);

				expect(res.status).toBeCalledTimes(1);
				expect(res.status).toBeCalledWith(200);
				expect(res.json).toBeCalledTimes(1);
				expect(res.json).toBeCalledWith(
					new NextJson({
						success: true,
						message: "Token generated!",
						data: [{ accessToken, refreshToken }],
					})
				);

				jest.restoreAllMocks();
			});
		});
	});
});
