import { invalidMethod } from "@/libs/mongodb/quotes-fetcher";
import { NextJson } from "@/models/next-json";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import bcrypt from "bcryptjs";
import { login } from "@/libs/mongodb/auth-fetcher";
import { aesEncrypt } from "@/libs/aes";
import { UserModel } from "@/models/user-model";

describe("Fetcher", () => {
	describe("when method is valid", () => {
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
				method: "POST",
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
				method: "POST",
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
				method: "POST",
				body: {
					username,
					password: aesEncrypt(password),
				},
			});
			await login(req, res);
			expect(res.json).toBeCalledWith(
				new NextJson({
					success: true,
					message: "Login success!",
					data: [
						new UserModel({
							username,
							email,
							name,
						}),
					],
				})
			);
		});
	});

	describe("when method is invalid", () => {
		const { req, res } = mockAPIArgs({ method: "GET" });
		it("should return error message", async () => {
			await invalidMethod(req, res);
			expect(res.setHeader).toBeCalledWith("Allow", ["POST"]);
			expect(res.status).toBeCalledWith(405);
			expect(res.json).toBeCalledWith(
				new NextJson({
					success: false,
					message: `Method ${req.method} Not Allowed`,
				})
			);
		});
	});
});
