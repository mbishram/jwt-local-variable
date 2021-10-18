import { NextApiRequest, NextApiResponse } from "next";
import { NextJson } from "@/classes/next-json";
import { connectToDatabase } from "@/libs/mongodb/setup";

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

const getAllQuotes = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let { db } = await connectToDatabase();
		let quotes = await db.collection("quotes").find().toArray();
		return res.json(
			new NextJson({
				message: JSON.parse(JSON.stringify(quotes)),
				success: true,
				data: quotes,
			})
		);
	} catch (error: any) {
		return res.json(
			new NextJson({
				message: new Error(error).message,
				success: false,
			})
		);
	}
};

const createQuotes = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let { db } = await connectToDatabase();
		await db.collection("quotes").insertOne(JSON.parse(req.body));
		return res.json(
			new NextJson({
				message: "Quotes added!",
				success: true,
			})
		);
	} catch (error: any) {
		return res.json(
			new NextJson({
				message: new Error(error).message,
				success: false,
			})
		);
	}
};

const invalidMethod = (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	res.setHeader("Allow", ["GET", "POST"]);
	return res.status(405).json(
		new NextJson({
			success: false,
			message: `Method ${method} Not Allowed`,
		})
	);
};
