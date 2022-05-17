import { NextApiRequest, NextApiResponse } from "next";
import { invalidMethod } from "@/libs/mongodb/fetcher-utils";
import { getToken } from "@/libs/mongodb/auth-fetcher";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			return getToken(req, res);
		default:
			return invalidMethod(req, res, { allowMethod: ["GET"] });
	}
}
