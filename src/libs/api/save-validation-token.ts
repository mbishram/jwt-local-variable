import { connectToDatabase } from "@/libs/mongodb/setup";
import { TOKENS_COLLECTION_NAME } from "@/libs/api/is-token-valid";
import crypto from "crypto";

/**
 * Save token and validationToken to db.
 * @param accessToken {string}
 * @return {string | undefined}
 */
export async function saveValidationToken(accessToken: string) {
	try {
		let { db } = await connectToDatabase();
		const validationToken = crypto.randomBytes(32).toString("hex");
		await db
			.collection(TOKENS_COLLECTION_NAME)
			.insertOne({ token: accessToken, validationToken });

		return validationToken;
	} catch (e) {
		return;
	}
}
