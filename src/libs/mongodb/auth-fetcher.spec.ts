import { NextJson } from "@/models/next-json";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import bcrypt from "bcryptjs";
import { getUser, login } from "@/libs/mongodb/auth-fetcher";
import { aesEncrypt } from "@/libs/aes";
import { UserModel } from "@/models/user-model";
import { generateAccessToken } from "@/libs/api/generate-access-token";
import { generateRefreshToken } from "@/libs/api/generate-refresh-token";
import { FetcherLoginResponseData } from "@/types/libs/mongodb/auth-fetcher";

describe("Fetcher", () => {
	describe("when login method is called", () => {
		const username = process.env.NEXT_PUBLIC_USER || "username";
		const email = process.env.NEXT_PUBLIC_EMAIL || "email@test.com";
		const password = process.env.NEXT_PUBLIC_PASS || "password";
		const name = process.env.NEXT_PUBLIC_NAME || "UserModel Name";

		beforeEach(async () => {
			const { db } = await connectToDatabase();
			await db.collection("users").insertOne({
				username,
				email,
				name,
				password: await bcrypt.hash(
					password,
					Number(process.env.SALT_ROUND_BE)
				),
			});
		});

		afterEach(async () => {
			const { db } = await connectToDatabase();
			await db.dropCollection("users");
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

		it("should be able to login on correct credential", async () => {
			const { req, res } = mockAPIArgs({
				body: {
					username,
					password: aesEncrypt(password),
				},
			});
			await login(req, res);

			const user = new UserModel({
				username,
				email,
				name,
			});
			const accessToken = await generateAccessToken(user);
			const refreshToken = await generateRefreshToken(user);

			expect(res.json).toBeCalledWith(
				new NextJson<FetcherLoginResponseData>({
					success: true,
					message: "Login success!",
					data: [{ accessToken, refreshToken }],
				})
			);
		});
	});

	describe("when getUser method is called", () => {
		it("Should be rejected on invalid/missing token", () => {
			const { req, res } = mockAPIArgs({
				headers: { Authorization: "" },
			});

			getUser(req, res);
		});
		it.todo("Should return user info on valid token");
	});
});
