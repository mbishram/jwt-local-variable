import { NextApiRequest, NextApiResponse } from "next";
import { extractToken } from "@/libs/api/extract-token";

/**
 * Check user authentication
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 */
export const checkAuth = (req: NextApiRequest, res: NextApiResponse) => {
	const authorizationHeader = req?.headers?.authorization;

	let token = extractToken(authorizationHeader);

	if (!token) {
		// Return with status 401, Access denied, token is missing!
		return [null, true];
	}

	try {
		// Verify token
		return [true, null];
	} catch (error) {
		// Return with status 401, Session timed out, please login again! "TokenExpiredError"
		// Return with status 401, Invalid token, please login again! "JsonWebTokenError"
		// Return with status 401, {error}
		return [null, true];
	}
};
