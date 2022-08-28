import { NextApiRequest, NextApiResponse } from "next";
import { createQuotes, deleteQuotes } from "@/libs/mongodb/quotes-fetcher";
import { invalidMethod } from "@/libs/mongodb/fetcher-utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let { method } = req;
	// This is done because html form submit doesn't support DELETE method.
	// CSRF Attack can only be done html through form submit.
	if (method === "GET") method = "DELETE";

	switch (method) {
		case "POST":
			return await createQuotes(req, res);

		case "DELETE":
			return await deleteQuotes(req, res);

		default:
			return invalidMethod(req, res, { allowMethod: ["POST", "DELETE"] });
	}
}
