import { UserModel } from "@/models/user-model";
import jwt from "jsonwebtoken";

/**
 * Generate Access Token
 * @param userData
 * @return { user: UserModel }
 */
export async function generateAccessToken(userData: UserModel) {
	try {
		return jwt.sign(
			{ user: userData },
			process?.env?.ACCESS_TOKEN_SECRET_KEY as string,
			{ expiresIn: "10m" }
		);
	} catch (error) {
		return;
	}
}
