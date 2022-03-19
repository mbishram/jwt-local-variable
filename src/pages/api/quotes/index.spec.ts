import quoteApi from "./index.page";
import { createQuotes, invalidMethod } from "@/libs/mongodb/quotes-fetcher";
import { checkAuth } from "@/libs/api/check-auth";
import { mockAPIArgs } from "@specs-utils/mock-api-args";

jest.mock("@/libs/mongodb/quotes-fetcher", () => ({
	createQuotes: jest.fn(),
	invalidMethod: jest.fn(),
}));

jest.mock("@/libs/api/check-auth", () => ({
	checkAuth: jest.fn(() => [true, null]), // Simulate successful authentication
}));

describe("API Quotes", () => {
	it("should be able to separate method based on request method", async () => {
		const { req: reqPost, res: resPost } = mockAPIArgs({ method: "POST" });
		await quoteApi(reqPost, resPost);
		expect(createQuotes).toBeCalled();
		expect(checkAuth).toBeCalled();

		const { req: reqInvalid, res: resInvalid } = mockAPIArgs({
			method: "DELETE",
		});
		await quoteApi(reqInvalid, resInvalid);
		expect(invalidMethod).toBeCalled();

		expect(createQuotes).toBeCalledTimes(1);
		expect(checkAuth).toBeCalledTimes(1);
		expect(invalidMethod).toBeCalledTimes(1);
	});
});
