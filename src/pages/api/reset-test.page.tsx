import { NextApiRequest, NextApiResponse } from "next";
import { invalidMethod } from "@/libs/mongodb/fetcher-utils";
import { resetTestData } from "@/libs/mongodb/test-fetcher";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let { method } = req;

	switch (method) {
		case "POST":
			return await resetTestData(req, res);
		default:
			return invalidMethod(req, res, { allowMethod: ["POST"] });
	}
}
