import { connectToDatabase } from "@/libs/mongodb/setup";
import { TOKENS_COLLECTION_NAME } from "@/libs/api/is-token-valid";
import crypto from "crypto";
import { ObjectId } from "bson";
import { getCookie, setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { NextJson } from "@/models/next-json";

export type ProcessCSRFTokenOptions = {
	req: NextApiRequest;
	res: NextApiResponse;
};
export type ProcessCSRFTokenReturnValue = [
	boolean | null,
	NextJson<any> | null
];

export const CSRF_TOKEN_COOKIE_NAME = "csrfToken";
export const CSRF_TOKEN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // A week

/**
 * Save token and csrfToken to db.
 * @param accessToken {string}
 * @param userId {string}
 * @param options {ProcessCSRFTokenOptions}
 * @return {string | undefined}
 */
export async function processCSRFToken(
	accessToken: string,
	userId: ObjectId,
	options: ProcessCSRFTokenOptions
): Promise<ProcessCSRFTokenReturnValue> {
	const { req, res } = options;

	try {
		let { db } = await connectToDatabase();
		const tokenCollection = db.collection(TOKENS_COLLECTION_NAME);

		// Remove all user's previous sessions and current computer's sessions
		const currentCSRFToken = getCookie(CSRF_TOKEN_COOKIE_NAME, {
			req,
			res,
		});
		await tokenCollection.deleteMany({
			$or: [{ userId }, { csrfToken: currentCSRFToken }],
		});

		const csrfToken = crypto.randomBytes(32).toString("hex");
		if (!csrfToken) {
			return [
				null,
				new NextJson({
					message:
						"Something went wrong! Failed to generate CSRF token.",
					success: false,
				}),
			];
		}

		await db.collection(TOKENS_COLLECTION_NAME).insertOne({
			token: accessToken,
			csrfToken,
			userId,
			createdAt: new Date(),
		});

		// Set httpOnly cookie
		setCookie(CSRF_TOKEN_COOKIE_NAME, csrfToken, {
			req,
			res,
			httpOnly: true,
			secure: true,
			maxAge: CSRF_TOKEN_COOKIE_MAX_AGE,
		});

		return [true, null];
	} catch (e) {
		return [
			null,
			new NextJson({
				message: "Something went wrong!",
				success: false,
			}),
		];
	}
}
