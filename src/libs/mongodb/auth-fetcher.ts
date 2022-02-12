import { NextApiRequest, NextApiResponse } from "next";
import { NextJson } from "@/classes/next-json";

/**
 * User login
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 */
export const login = async (req: NextApiRequest, res: NextApiResponse) => {
	// try {
	// 	let { db } = await connectToDatabase();
	// 	await db.collection("users").insertOne(req.body);
	// 	return res.json(
	// 		new NextJson({
	// 			message: "Quotes added!",
	// 			success: true,
	// 		})
	// 	);
	// } catch (error: any) {
	// 	return res.status(500).json(
	// 		new NextJson({
	// 			message: new Error(error).message,
	// 			success: false,
	// 		})
	// 	);
	// }
};

/**
 * Handle invalid request method
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 */
export const invalidMethod = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	res.setHeader("Allow", ["POST"]);
	return res.status(405).json(
		new NextJson({
			success: false,
			message: `Method ${method} Not Allowed`,
		})
	);
};
