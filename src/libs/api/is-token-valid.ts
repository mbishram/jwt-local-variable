import { connectToDatabase } from "@/libs/mongodb/setup";
import { CookieValueTypes } from "cookies-next";

export const TOKENS_COLLECTION_NAME = "tokens";

/**
 * Checking if token exist on database and is valid
 * @param token {string}
 * @param csrfToken {CookieValueTypes}
 * @return {boolean}
 */
export async function isTokenValid(
	token?: string,
	csrfToken?: CookieValueTypes
) {
	let { db } = await connectToDatabase();

	if (!token) return false;

	try {
		const tokenRes = await db
			.collection(TOKENS_COLLECTION_NAME)
			.findOne({ token });

		if (!tokenRes) return false;

		return tokenRes.csrfToken === csrfToken;
	} catch (e) {
		return false;
	}
}
