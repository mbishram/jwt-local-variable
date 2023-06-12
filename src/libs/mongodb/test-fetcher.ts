import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/libs/mongodb/setup";
import { NextJson } from "@/models/next-json";
import { QUOTES_COLLECTION_NAME } from "@/libs/mongodb/quotes-fetcher";
import { ObjectID } from "bson";

/**
 * Reset test
 */
export const resetTestData = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		let { db } = await connectToDatabase();

		await db.collection(QUOTES_COLLECTION_NAME).deleteMany({});
		await db.collection(QUOTES_COLLECTION_NAME).insertMany([
			{
				_id: new ObjectID("630585f2a6039e8f076e6c7f"),
				name: "James Doe",
				quote: "<b>Give a little color to your quote!</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid aperiam beatae corporis delectus, dolorum inventore nihil quas quod rem sapiente suscipit velit! Commodi, cupiditate ipsa itaque magnam maxime quam?",
				bgColor: "bg-green-800",
				username: "Admin",
			},
			{
				_id: new ObjectID("6484647f55d6faebbe695c50"),
				name: "User",
				quote: "Your custom quote here!",
				bgColor: "bg-blue-800",
				userId: new ObjectID("61f9147cba2fd619cdcddce1"),
				username: "Muh Bishram",
			},
		]);

		return res.json(
			new NextJson({
				message: "Test berhasil direset!",
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
