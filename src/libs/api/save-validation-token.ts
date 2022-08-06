import { connectToDatabase } from "@/libs/mongodb/setup";
import { TOKENS_COLLECTION_NAME } from "@/libs/api/is-token-valid";
import crypto from "crypto";
import { ObjectId } from "bson";

/**
 * Save token and validationToken to db.
 * @param accessToken {string}
 * @param userId {string}
 * @return {string | undefined}
 */
export async function saveValidationToken(
	accessToken: string,
	userId: ObjectId
) {
	try {
		let { db } = await connectToDatabase();
		const validationToken = crypto.randomBytes(32).toString("hex");
		await db
			.collection(TOKENS_COLLECTION_NAME)
			.insertOne({ token: accessToken, validationToken, userId });

		return validationToken;
	} catch (e) {
		return;
	}
}
