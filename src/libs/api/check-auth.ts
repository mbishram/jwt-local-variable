import { NextApiRequest, NextApiResponse } from "next";
import { extractToken } from "@/libs/api/extract-token";
import { NextJson } from "@/models/next-json";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JWT_ERROR_TYPES } from "@/constants/jwt-error-types";
import { isTokenPayloadMatch } from "@/libs/api/is-token-payload-match";

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
			process?.env?.ACCESS_TOKEN_SECRET_KEY as string
		);

		// map req.body, check on jwt res, if req.body[key] = undefined, skip it
		if (!isTokenPayloadMatch(req.body, jwtRes)) {
			const error = res.status(401).json(
				new NextJson({
					message:
						"Token got an invalid credential, please login again!",
					success: false,
				})
			);
			return [null, error, jwtRes, req.body];
		}

		const data = res.status(200).json(
			new NextJson({
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
			default:
				error = res.status(401).json(
					new NextJson({
						message: "Invalid token, please login again",
						success: false,
					})
				);
				break;
		}
		return [null, error];
	}
};
