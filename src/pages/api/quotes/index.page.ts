import { NextApiRequest, NextApiResponse } from "next";
import { createQuotes, invalidMethod } from "@/libs/mongodb/quotes-fetcher";
import { checkAuth } from "@/libs/api/check-auth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	switch (method) {
		case "POST":
			const [data, error] = await checkAuth(req, res);

			if (data) return await createQuotes(req, res);
			return error;
		default:
			return invalidMethod(req, res);
	}
}
