import { NextApiRequest, NextApiResponse } from "next";
import { createQuotes } from "@/libs/mongodb/quotes-fetcher";
import { invalidMethod } from "@/libs/mongodb/fetcher-utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	switch (method) {
		case "POST":
			// TODO: Change this back later
			const [data, error] = [null, true]; // await checkAuth(req, res);

			if (data) return await createQuotes(req, res);
			return error;
		default:
			return invalidMethod(req, res, { allowMethod: ["POST"] });
	}
}
