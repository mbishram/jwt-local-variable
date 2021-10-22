import { connectToDatabase } from "@/libs/mongodb/setup";

describe("Setup Mongodb", () => {
	it("should return MongoClient and MongoDb", async () => {
		const { client, db } = await connectToDatabase();
		expect(client).not.toBeNull();
		expect(db).not.toBeNull();
	});
});
