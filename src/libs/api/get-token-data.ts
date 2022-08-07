import { extractToken } from "@/libs/api/extract-token";
import { NextJson } from "@/models/next-json";
import jwt, { JsonWebTokenError, VerifyOptions } from "jsonwebtoken";
import { JWT_ERROR_TYPES } from "@/constants/jwt-error-types";
import { getCookie } from "cookies-next";
import { VALIDATION_TOKEN_COOKIE_NAME } from "@/libs/api/process-validation-token";

/**
 * Get token data
 * @param authorizationHeader
 * @param secret
 * @param options
 */
export const getTokenData = async (
	authorizationHeader: string,
	secret: string,
	options?: VerifyOptions
) => {
	let token = extractToken(authorizationHeader);

	// TODO: Remove this later, add req and res to options
	console.log(
		"_TST",
		getCookie(VALIDATION_TOKEN_COOKIE_NAME /*, { req, res }*/)
	);

	if (!token) {
		const error = new NextJson({
			message: "Access denied, token is missing!",
			success: false,
		});
		return [null, error];
	}

	try {
		const jwtRes = await jwt.verify(token, secret, options);

		const data = new NextJson<typeof jwtRes>({
			message: "JWT Valid",
			success: true,
			data: [jwtRes],
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
