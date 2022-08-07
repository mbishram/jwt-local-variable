import { extractToken } from "@/libs/api/extract-token";
import { NextJson } from "@/models/next-json";
import jwt, { JsonWebTokenError, VerifyOptions } from "jsonwebtoken";
import { JWT_ERROR_TYPES } from "@/constants/jwt-error-types";
import { CookieValueTypes } from "cookies-next";
import { isTokenValid } from "@/libs/api/is-token-valid";

export type GetTokenDataParams = {
	authorizationHeader: string;
	secret: string;
	validationToken: CookieValueTypes;
};

/**
 * Get token data
 * @param params {GetTokenDataParams}
 * @param options
 */
export const getTokenData = async (
	params: GetTokenDataParams,
	options?: VerifyOptions
) => {
	const { authorizationHeader, secret, validationToken } = params;
	let token = extractToken(authorizationHeader);

	if (!token) {
		const error = new NextJson({
			message: "Access denied, token is missing!",
			success: false,
		});
		return [null, error];
	}

	const isValid = await isTokenValid(token, validationToken);
	if (!isValid) {
		const error = new NextJson({
			message: "Access denied, token is not valid!",
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
