import { NextApiRequest, NextApiResponse } from "next";
import { createQuotes, invalidMethod } from "@/libs/mongodb/fetcher";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "POST":
			return createQuotes(req, res);
		default:
			return invalidMethod(req, res);
	}
}
