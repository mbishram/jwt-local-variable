import { NextApiRequest, NextApiResponse } from "next";
import { extractToken } from "@/libs/api/extract-token";
import { NextJson } from "@/classes/next-json";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JWT_ERROR_TYPES } from "@/constants/jwt-error-types";

/**
 * Check user authentication
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 */
export const checkAuth = async (req: NextApiRequest, res: NextApiResponse) => {
	const authorizationHeader = req?.headers?.authorization;

	let token = extractToken(authorizationHeader);

	if (!token) {
		const error = res.status(401).json(
			new NextJson({
				message: "Access denied, token is missing!",
				success: false,
			})
		);
		return [null, error];
	}

	try {
		const jwtRes = jwt.verify(
			token,
			process?.env?.ACCESS_TOKEN_SECRET_KEY || ""
		);
		const data = res.status(200).json(
			new NextJson({
				data: [jwtRes],
				message: "JWT Valid",
				success: true,
			})
		);
		return [data, null];
	} catch (e) {
		const er = e as JsonWebTokenError;
		let error;

		switch (er.name) {
			case JWT_ERROR_TYPES.EXPIRED:
				error = res.status(401).json(
					new NextJson({
						message: "Session timed out, please login again",
						success: false,
					})
				);
				break;
			case JWT_ERROR_TYPES.ERROR:
				error = res.status(401).json(
					new NextJson({
						message: "Invalid token, please login again",
						success: false,
					})
				);
				break;
			default:
				error = res.status(400).json(
					new NextJson({
						message:
							"There is something wrong with the token, please login again",
						success: false,
					})
				);
		}
		return [null, error];
	}
};
