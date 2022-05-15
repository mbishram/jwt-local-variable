import quoteApi from "./index.page";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import { invalidMethod } from "@/libs/mongodb/fetcher-utils";

jest.mock("@/libs/mongodb/quotes-fetcher", () => ({
	createQuotes: jest.fn(),
}));

jest.mock("@/libs/api/get-token-data", () => ({
	getTokenData: jest.fn(() => [true, null]), // Simulate successful authentication
}));

jest.mock("@/libs/mongodb/fetcher-utils", () => ({
	invalidMethod: jest.fn(),
}));

describe("API Quotes", () => {
	it("should be able to separate method based on request method", async () => {
		const { req: reqPost, res: resPost } = mockAPIArgs({ method: "POST" });
		await quoteApi(reqPost, resPost);
		// TODO: Change this back later
		// expect(createQuotes).toBeCalled();
		// expect(getTokenData).toBeCalled();

		const { req: reqInvalid, res: resInvalid } = mockAPIArgs({
			method: "DELETE",
		});
		await quoteApi(reqInvalid, resInvalid);
		expect(invalidMethod).toBeCalledWith(reqInvalid, resInvalid, {
			allowMethod: ["POST"],
		});

		// TODO: Change this back later
		// expect(createQuotes).toBeCalledTimes(1);
		// expect(getTokenData).toBeCalledTimes(1);
		expect(invalidMethod).toBeCalledTimes(1);
	});
});
