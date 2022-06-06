import { NextApiRequest, NextApiResponse } from "next";
import { NextJson } from "@/models/next-json";
import { InvalidMethodOptions } from "@/types/libs/mongodb/fetcher-utils";

/**
 * Handle invalid request method
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 * @param options {InvalidMethodOptions}
 */
export const invalidMethod = (
	req: NextApiRequest,
	res: NextApiResponse,
	options: InvalidMethodOptions
) => {
	const { method } = req;
	const { allowMethod } = options;
	res.setHeader("Access-Control-Allow-Methods", allowMethod || "*");
	return res.status(405).json(
		new NextJson({
			success: false,
			message: `Method ${method} Not Allowed`,
		})
	);
};
