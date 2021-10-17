/**
 * @jest-environment ./specs/environments/custom-test-env.ts
 */

import { connectToDatabase } from "@/libs/mongodb";

describe("Mongodb", () => {
	it("should return MongoClient and MongoDb", async () => {
		const { client, db } = await connectToDatabase();
		expect(client).not.toBeNull();
		expect(db).not.toBeNull();
	});
});
