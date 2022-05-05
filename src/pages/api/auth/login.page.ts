import { NextApiRequest, NextApiResponse } from "next";
import { invalidMethod, login } from "@/libs/mongodb/auth-fetcher";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "POST":
			return login(req, res);
		default:
			return invalidMethod(req, res);
	}
}
