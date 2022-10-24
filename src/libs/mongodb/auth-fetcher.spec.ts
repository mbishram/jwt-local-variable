import { NextJson } from "@/models/next-json";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import bcrypt from "bcryptjs";
import {
	getToken,
	getUser,
	login,
	logout,
	USERS_COLLECTION_NAME,
} from "@/libs/mongodb/auth-fetcher";
import { aesEncrypt } from "@/libs/aes";
import { UserModel } from "@/models/user-model";
import { generateAccessToken } from "@/libs/api/generate-access-token";
import { FetcherLoginResponseData } from "@/types/libs/mongodb/auth-fetcher";
import { ObjectId } from "bson";
import {
	spyOnProcessCSRFToken,
	spyOnProcessCSRFTokenFailedResponse,
} from "@specs-utils/spy-on-process-csrf-token";
import { spyOnIsTokenValid } from "@specs-utils/spy-on-is-token-valid";
import { TOKENS_COLLECTION_NAME } from "@/libs/api/is-token-valid";
import {
	spyOnDeleteCookie,
	spyOnGetCookie,
	spyOnSetCookie,
} from "@specs-utils/spy-on-cookies-next";
import { deleteCookie, setCookie } from "cookies-next";

describe("Fetcher", () => {
	const tokenPayload = { test: "Test Data" } as unknown as UserModel;
	const username = process.env.NEXT_PUBLIC_USER || "username";
	const email = process.env.NEXT_PUBLIC_EMAIL || "email@test.com";
	const password = process.env.NEXT_PUBLIC_PASS || "password";
	const name = process.env.NEXT_PUBLIC_NAME || "UserModel Name";

	beforeEach(() => {
		spyOnIsTokenValid();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("when login method is called", () => {
		let id: ObjectId;

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

		it("should be rejected on csrf token failed to generate", async () => {
			spyOnProcessCSRFToken(false);
			spyOnSetCookie();
			const { req, res } = mockAPIArgs({
				body: {
					username,
					password: aesEncrypt(password),
				},
			});
			await login(req, res);

			expect(res.status).toBeCalledWith(500);
			expect(res.json).toBeCalledWith(
				spyOnProcessCSRFTokenFailedResponse
			);

			jest.restoreAllMocks();
		});

		it("should be able to login and generate csrfToken on correct credential", async () => {
			spyOnProcessCSRFToken();
			spyOnSetCookie();

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

			expect(setCookie).toBeCalledTimes(1);

			expect(res.json).toBeCalledWith(
				new NextJson<FetcherLoginResponseData>({
					success: true,
					message: "Login success!",
					data: [
						{
							accessToken,
							csrfToken: "TestCSRFToken",
						},
					],
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
			beforeEach(async () => {
				const { db } = await connectToDatabase();

				await db.collection(TOKENS_COLLECTION_NAME).insertOne({
					token: process.env.JWT_EXPIRED,
					refreshToken: process.env.JWT_VALID_REFRESH,
					csrfToken: "CSRF Token",
				});
			});

			afterEach(async () => {
				const { db } = await connectToDatabase();

				await db.dropCollection(TOKENS_COLLECTION_NAME);
			});

			it("should be rejected when csrf token failed to generate", async () => {
				spyOnProcessCSRFToken(false);
				spyOnGetCookie(process.env.JWT_VALID_REFRESH);
				spyOnSetCookie();

				const authorization = "Bearer " + process.env.JWT_EXPIRED;

				const { req, res } = mockAPIArgs({
					headers: {
						authorization,
					},
				});

				await getToken(req, res);

				expect(setCookie).toBeCalledTimes(0);

				expect(res.status).toBeCalledWith(500);
				expect(res.json).toBeCalledWith(
					spyOnProcessCSRFTokenFailedResponse
				);

				jest.restoreAllMocks();
			});

			it("should return the new access token", async () => {
				spyOnProcessCSRFToken();
				spyOnGetCookie(process.env.JWT_VALID_REFRESH);
				spyOnSetCookie();

				const authorization = "Bearer " + process.env.JWT_EXPIRED;
				const accessToken = await generateAccessToken(tokenPayload);

				const { req, res } = mockAPIArgs({
					headers: {
						authorization,
					},
				});

				await getToken(req, res);

				expect(setCookie).toBeCalledTimes(1);

				expect(res.status).toBeCalledTimes(1);
				expect(res.status).toBeCalledWith(200);
				expect(res.json).toBeCalledTimes(1);
				expect(res.json).toBeCalledWith(
					new NextJson({
						success: true,
						message: "Token generated!",
						data: [
							{
								accessToken,
								csrfToken: "TestCSRFToken",
							},
						],
					})
				);

				jest.restoreAllMocks();
			});
		});
	});

	describe("when logout method is called", () => {
		const user = new UserModel({
			id: new ObjectId(),
			username,
			email,
			name,
		});

		it("should remove token data from db, local variable, and cookie", async () => {
			spyOnDeleteCookie();
			let { db } = await connectToDatabase();
			const tokenCollection = db.collection(TOKENS_COLLECTION_NAME);

			const cookieValue = "CookieValue";
			const bearerCookieValue = "CookieValue";
			const token = await generateAccessToken(user);
			const authorization = "Bearer " + token;

			const { req, res } = mockAPIArgs({
				headers: { authorization, "token-csrf": bearerCookieValue },
			});

			const userId = user.id;
			await tokenCollection.insertMany([
				{
					token,
					csrfToken: cookieValue,
					userId,
					createdAt: new Date(),
				},
				{
					token: "Other token",
					csrfToken: "Loremipsum",
					userId: new ObjectId(),
					createdAt: new Date(),
				},
			]);
			expect(
				(await db.collection(TOKENS_COLLECTION_NAME).find().toArray())
					.length
			).toBe(2);

			await logout(req, res);

			expect(
				(await db.collection(TOKENS_COLLECTION_NAME).find().toArray())
					.length
			).toBe(1);

			expect(deleteCookie).toBeCalledTimes(1);
			expect(res.status).toBeCalledWith(200);
			expect(res.json).toBeCalledWith(
				new NextJson({
					success: true,
					message: "Logout success!",
				})
			);

			jest.restoreAllMocks();
		});
	});
});
