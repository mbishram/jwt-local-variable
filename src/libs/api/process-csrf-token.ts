import { connectToDatabase } from "@/libs/mongodb/setup";
import { TOKENS_COLLECTION_NAME } from "@/libs/api/is-token-valid";
import crypto from "crypto";
import { ObjectId } from "bson";
import { NextJson } from "@/models/next-json";
import { getCSRFToken } from "@/libs/token/variable-handler";

export type ProcessCSRFTokenReturnValue = [string | null, NextJson<any> | null];

/**
 * Save token and csrfToken to db.
 * @param accessToken {string}
 * @param refreshToken {string}
 * @param userId {string}
 * @return {string | undefined}
 */
export async function processCSRFToken(
	accessToken: string,
	refreshToken: string,
	userId: ObjectId
): Promise<ProcessCSRFTokenReturnValue> {
	try {
		let { db } = await connectToDatabase();
		const tokenCollection = db.collection(TOKENS_COLLECTION_NAME);

		// Remove all user's previous sessions and current computer's sessions
		const currentCSRFToken = getCSRFToken();
		if (userId || currentCSRFToken) {
			await tokenCollection.deleteMany({
				$or: [{ userId }, { csrfToken: currentCSRFToken }],
			});
		}

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
			refreshToken,
			userId,
			createdAt: new Date(),
		});

		return [csrfToken, null];
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
