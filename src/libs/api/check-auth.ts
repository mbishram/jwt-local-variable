import { extractToken } from "@/libs/api/extract-token";
import { NextJson } from "@/models/next-json";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JWT_ERROR_TYPES } from "@/constants/jwt-error-types";
import { isTokenPayloadMatch } from "@/libs/api/is-token-payload-match";
import { GenericObject } from "@/types/ui/generic-object";
import { CheckAuth } from "@/types/libs/api/check-auth";

/**
 * Check user authentication
 * @param authorizationHeader
 * @param dataMatch {GenericObject} Data that are match against token's payload
 * @param secret
 */
export const checkAuth = async ({
	authorizationHeader,
	dataMatch,
	secret,
}: CheckAuth) => {
	let token = extractToken(authorizationHeader);

	if (!token) {
		const error = new NextJson({
			message: "Access denied, token is missing!",
			success: false,
		});
		return [null, error];
	}

	try {
		const jwtRes = jwt.verify(token, secret);

		if (!isTokenPayloadMatch(dataMatch, jwtRes)) {
			const error = new NextJson({
				message: "Token got an invalid credential, please login again!",
				success: false,
			});
			return [null, error];
		}

		const data = new NextJson({
			message: "JWT Valid",
			success: true,
		});
		return [data, null];
	} catch (e) {
		const er = e as JsonWebTokenError;
		let error;

		switch (er.name) {
			case JWT_ERROR_TYPES.EXPIRED:
				error = new NextJson({
					message: "Session timed out, please login again",
					success: false,
				});
				break;
			case JWT_ERROR_TYPES.ERROR:
			default:
				error = new NextJson({
					message: "Invalid token, please login again",
					success: false,
				});
				break;
		}
		return [null, error];
	}
};
