import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { NextJson } from "@/models/next-json";

/**
 * Fetch all quotes
 */
export const getAllQuotes = async () => {
	try {
		let { db } = await connectToDatabase();
		let quotes = await db
			.collection("quotes")
			.find()
			.sort({ _id: -1 })
			.toArray();
		return new NextJson({
			message: "Quotes successfully fetched!",
			success: true,
			data: quotes,
		});
	} catch (error: any) {
		return new NextJson({
			message: new Error(error).message,
			success: false,
		});
	}
};

/**
 * Create quote document
 */
export const createQuotes = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		let { db } = await connectToDatabase();
		await db.collection("quotes").insertOne(req.body);
		return res.json(
			new NextJson({
				message: "Quotes added!",
				success: true,
			})
		);
	} catch (error: any) {
		return res.status(500).json(
			new NextJson({
				message: new Error(error).message,
				success: false,
			})
		);
	}
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
