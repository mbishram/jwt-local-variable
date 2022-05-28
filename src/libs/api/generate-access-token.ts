import { UserModel } from "@/models/user-model";
import jwt from "jsonwebtoken";

/**
 * Generate Access Token | Payload : { user: UserModel }
 * @param userData
 */
export async function generateAccessToken(userData: UserModel) {
	try {
		return jwt.sign(
			{ ...userData },
			process?.env?.ACCESS_TOKEN_SECRET_KEY as string,
			{ expiresIn: "5m" }
		);
	} catch (error) {
		return;
	}
}
