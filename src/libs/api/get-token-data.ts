import { extractToken } from "@/libs/api/extract-token";
import { NextJson } from "@/models/next-json";
import jwt, { JsonWebTokenError, VerifyOptions } from "jsonwebtoken";
import { JWT_ERROR_TYPES } from "@/constants/jwt-error-types";
import { isTokenValid } from "@/libs/api/is-token-valid";

export type GetTokenDataParams = {
	authorizationHeader: string;
	secret: string;
	csrfToken?: string;
};
export type GetTokenDataOptions = VerifyOptions & { alwaysValid?: boolean };

/**
 * Get token data
 * @param params {GetTokenDataParams}
 * @param alwaysValid {boolean} - Flag to disable token check
 * @param options
 */
export const getTokenData = async (
	params: GetTokenDataParams,
	{ alwaysValid, ...options }: GetTokenDataOptions = { alwaysValid: false }
) => {
	const { authorizationHeader, secret, csrfToken } = params;
	let token = extractToken(authorizationHeader);

	if (!token) {
		const error = new NextJson({
			message: "Access denied, token is missing!",
			success: false,
		});
		return [null, error];
	}

	if (!alwaysValid) {
		const isValid = await isTokenValid(token, csrfToken);
		if (!isValid) {
			const error = new NextJson({
				message: "Access denied, token is not valid!",
				success: false,
			});
			return [null, error];
		}
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
