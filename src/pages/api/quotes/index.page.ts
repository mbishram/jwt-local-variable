import { NextApiRequest, NextApiResponse } from "next";
import {
	createQuotes,
	getAllQuotes,
	invalidMethod,
} from "@/libs/mongodb/fetcher";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case "GET":
			return getAllQuotes(req, res);
		case "POST":
			return createQuotes(req, res);
		default:
			return invalidMethod(req, res);
	}
}
