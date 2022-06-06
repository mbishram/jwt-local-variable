import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@/libs/mongodb/auth-fetcher";
import { invalidMethod } from "@/libs/mongodb/fetcher-utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			return getUser(req, res);
		default:
			return invalidMethod(req, res, { allowMethod: ["GET"] });
	}
}
