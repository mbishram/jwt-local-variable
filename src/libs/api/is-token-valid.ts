import { connectToDatabase } from "@/libs/mongodb/setup";

export const TOKENS_COLLECTION_NAME = "tokens";

// TODO: use this on getTokenData?

/**
 * Checking if token exist on database and is valid
 * @param token {string}
 * @param validationToken {string}
 * @return {boolean}
 */
export async function isTokenValid(token?: string, validationToken?: string) {
	let { db } = await connectToDatabase();

	if (!token) return false;

	const tokenRes = await db
		.collection(TOKENS_COLLECTION_NAME)
		.findOne({ token });

	if (!tokenRes) return false;

	return tokenRes.validationToken === validationToken;
}
