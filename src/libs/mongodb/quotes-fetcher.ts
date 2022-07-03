import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { NextJson } from "@/models/next-json";
import { getTokenData } from "@/libs/api/get-token-data";
import { UserModel } from "@/models/user-model";

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
	// Try to get token from cookie first,
	// This is done to make them vulnerable to CSRF
	// TODO: get it from cookie first || req?.header?.authorization
	const authorizationHeader = (req?.headers?.authorization || "") as string;
	const [data, error] = await getTokenData(
		authorizationHeader,
		String(process.env.ACCESS_TOKEN_SECRET_KEY)
	);

	if (error) return res.status(401).json(error);

	if (data) {
		const userId = (data?.data?.[0] as UserModel)?.id || "";

		try {
			let { db } = await connectToDatabase();
			await db.collection("quotes").insertOne({ ...req.body, userId });
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
	}
};
