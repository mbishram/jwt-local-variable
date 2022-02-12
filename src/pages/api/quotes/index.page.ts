import { NextApiRequest, NextApiResponse } from "next";
import { createQuotes, invalidMethod } from "@/libs/mongodb/quotes-fetcher";
import { checkAuth } from "@/libs/api/check-auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "POST":
			const [data, error] = checkAuth(req, res);

			if (data) return createQuotes(req, res);
			return error;
		default:
			return invalidMethod(req, res);
	}
}
