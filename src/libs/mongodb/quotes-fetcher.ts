import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { NextJson } from "@/models/next-json";
import { getTokenData } from "@/libs/api/get-token-data";
import { UserModel } from "@/models/user-model";
import { ObjectId } from "bson";
import { getValidationTokenCookie } from "@/libs/api/get-validation-token-cookie";

export const QUOTES_COLLECTION_NAME = "quotes";

/**
 * Fetch all quotes
 */
export const getAllQuotes = async () => {
	try {
		let { db } = await connectToDatabase();
		let quotes = await db
			.collection(QUOTES_COLLECTION_NAME)
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
	const authorizationHeader = (req?.headers?.authorization || "") as string;
	const validationToken = getValidationTokenCookie(req, res);
	const [data, error] = await getTokenData({
		authorizationHeader,
		secret: String(process.env.ACCESS_TOKEN_SECRET_KEY),
		validationToken,
	});

	if (error) return res.status(401).json(error);

	if (data) {
		const userId = new ObjectId((data?.data?.[0] as UserModel)?.id) || "";
		const username = (data?.data?.[0] as UserModel)?.name || "";

		try {
			let { db } = await connectToDatabase();
			const body =
				typeof req.body === "string" ? JSON.parse(req.body) : req.body;
			await db
				.collection(QUOTES_COLLECTION_NAME)
				.insertOne({ ...body, userId, username });
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
