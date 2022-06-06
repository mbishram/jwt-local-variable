import { NextApiRequest, NextApiResponse } from "next";
import { login } from "@/libs/mongodb/auth-fetcher";
import { invalidMethod } from "@/libs/mongodb/fetcher-utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "POST":
			return login(req, res);
		default:
			return invalidMethod(req, res, { allowMethod: ["POST"] });
	}
}
