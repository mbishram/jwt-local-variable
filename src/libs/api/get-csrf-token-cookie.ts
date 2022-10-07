import { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import { CSRF_TOKEN_COOKIE_NAME } from "@/libs/api/process-csrf-token";

export function getCSRFTokenCookie(req: NextApiRequest, res: NextApiResponse) {
	return getCookie(CSRF_TOKEN_COOKIE_NAME, { req, res });
}
