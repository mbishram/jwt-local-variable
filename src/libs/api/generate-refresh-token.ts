import { UserModel } from "@/models/user-model";
import jwt from "jsonwebtoken";

/**
 * Generate Refresh Token | Payload : { user: UserModel }
 * @param userData
 */
export async function generateRefreshToken(userData: UserModel) {
	try {
		return jwt.sign(
			{ user: userData },
			process?.env?.REFRESH_TOKEN_SECRET_KEY as string,
			{ expiresIn: "7d" }
		);
	} catch (error) {
		return;
	}
}
