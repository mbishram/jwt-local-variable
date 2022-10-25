import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { NextJson } from "@/models/next-json";
import { getTokenData } from "@/libs/api/get-token-data";
import { UserModel } from "@/models/user-model";
import { ObjectId } from "bson";
import { extractCSRFToken } from "@/libs/api/extract-csrf-token";
import { JWT_ACCESS_TOKEN_COOKIE } from "@/libs/token/storage-handler";

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
	// Use cookie if there's no authorization header.
	// This is done to make them vulnerable to CSRF.
	// DON'T DO THIS! This is unnecessary on real application.
	const tokenCookie =
		req?.headers?.cookie
			?.match("(^|;)\\s*" + JWT_ACCESS_TOKEN_COOKIE + "\\s*=\\s*([^;]+)")
			?.pop() || "";
	const authorizationCookie = tokenCookie && "Bearer " + tokenCookie;
	const authorizationHeader = (req?.headers?.authorization ||
		authorizationCookie ||
		"") as string;
	const csrfToken = extractCSRFToken(req);
	const [data] = await getTokenData({
		authorizationHeader,
		secret: String(process.env.ACCESS_TOKEN_SECRET_KEY),
		csrfToken: csrfToken,
	});

	const userId = data && new ObjectId((data?.data?.[0] as UserModel)?.id);
	const username = data && (data?.data?.[0] as UserModel)?.name;

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
};
/**
 * Delete all quote document
 */
export const deleteQuotes = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	// Use cookie if there's no authorization header.
	// This is done to make them vulnerable to CSRF.
	// DON'T DO THIS! This is unnecessary on real application.
	const tokenCookie =
		req?.headers?.cookie
			?.match("(^|;)\\s*" + JWT_ACCESS_TOKEN_COOKIE + "\\s*=\\s*([^;]+)")
			?.pop() || "";
	const authorizationCookie = tokenCookie && "Bearer " + tokenCookie;
	const authorizationHeader = (req?.headers?.authorization ||
		authorizationCookie ||
		"") as string;
	const csrfToken = extractCSRFToken(req);
	const [data, error] = await getTokenData(
		{
			authorizationHeader,
			secret: String(process.env.ACCESS_TOKEN_SECRET_KEY),
			csrfToken,
		},
		{ alwaysValid: true }
	);

	if (error) return res.status(401).json(error);

	if (data) {
		const userId = new ObjectId((data?.data?.[0] as UserModel)?.id);

		try {
			let { db } = await connectToDatabase();
			await db.collection(QUOTES_COLLECTION_NAME).deleteMany({ userId });

			return res.json(
				new NextJson({
					message: "All quotes deleted!",
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
