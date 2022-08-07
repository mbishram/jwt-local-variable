import { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import { VALIDATION_TOKEN_COOKIE_NAME } from "@/libs/api/process-validation-token";

export function getValidationTokenCookie(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return getCookie(VALIDATION_TOKEN_COOKIE_NAME, { req, res });
}
