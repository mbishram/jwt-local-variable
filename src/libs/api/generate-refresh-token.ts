import jwt from "jsonwebtoken";

/**
 * Generate Refresh Token
 */
export async function generateRefreshToken() {
	try {
		return jwt.sign({}, process?.env?.REFRESH_TOKEN_SECRET_KEY as string, {
			expiresIn: "7d",
		});
	} catch (error) {
		return;
	}
}
