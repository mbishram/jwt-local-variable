import { connectToDatabase } from "@/libs/mongodb/setup";
import { TOKENS_COLLECTION_NAME } from "@/libs/api/is-token-valid";
import crypto from "crypto";
import { ObjectId } from "bson";
import { getCookie, setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { NextJson } from "@/models/next-json";

export type ProcessValidationTokenOptions = {
	req: NextApiRequest;
	res: NextApiResponse;
};
export type ProcessValidationTokenReturnValue = [
	boolean | null,
	NextJson<any> | null
];

export const VALIDATION_TOKEN_COOKIE_NAME = "validationToken";
export const VALIDATION_TOKEN_COOKIE_MAX_AGE = 5 * 60; // 5 minutes.

/**
 * Save token and validationToken to db.
 * @param accessToken {string}
 * @param userId {string}
 * @param options {ProcessValidationTokenOptions}
 * @return {string | undefined}
 */
export async function processValidationToken(
	accessToken: string,
	userId: ObjectId,
	options: ProcessValidationTokenOptions
): Promise<ProcessValidationTokenReturnValue> {
	const { req, res } = options;

	try {
		let { db } = await connectToDatabase();
		const tokenCollection = db.collection(TOKENS_COLLECTION_NAME);

		// Remove all user's previous sessions and current computer's sessions
		const currentValidationToken = getCookie(VALIDATION_TOKEN_COOKIE_NAME, {
			req,
			res,
		});
		await tokenCollection.deleteMany({
			$or: [{ userId }, { validationToken: currentValidationToken }],
		});

		const validationToken = crypto.randomBytes(32).toString("hex");
		if (!validationToken) {
			return [
				null,
				new NextJson({
					message:
						"Something went wrong! Failed to generate validation token.",
					success: false,
				}),
			];
		}

		await db.collection(TOKENS_COLLECTION_NAME).insertOne({
			token: accessToken,
			validationToken,
			userId,
			createdAt: new Date(),
		});

		// Set httpOnly cookie
		setCookie(VALIDATION_TOKEN_COOKIE_NAME, validationToken, {
			req,
			res,
			httpOnly: true,
			secure: true,
			maxAge: VALIDATION_TOKEN_COOKIE_MAX_AGE,
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
