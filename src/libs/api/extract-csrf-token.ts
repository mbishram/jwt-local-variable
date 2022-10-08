import { NextApiRequest } from "next";
import { extractToken } from "@/libs/api/extract-token";

export function extractCSRFToken(req: NextApiRequest) {
	return extractToken(req?.headers?.["token-csrf"] as string);
}
