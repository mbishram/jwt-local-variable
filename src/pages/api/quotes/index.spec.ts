import quoteApi from "./index.page";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import { invalidMethod } from "@/libs/mongodb/fetcher-utils";
import { createQuotes } from "@/libs/mongodb/quotes-fetcher";

jest.mock("@/libs/mongodb/quotes-fetcher", () => ({
	createQuotes: jest.fn(),
}));

jest.mock("@/libs/mongodb/fetcher-utils", () => ({
	invalidMethod: jest.fn(),
}));

describe("API Quotes", () => {
	it("should be able to separate method based on request method", async () => {
		const { req: reqPost, res: resPost } = mockAPIArgs({
			method: "POST",
			headers: {
				authorization: "Bearer " + process.env.JWT_VALID_ACCESS,
			},
		});
		await quoteApi(reqPost, resPost);
		expect(createQuotes).toBeCalled();

		const { req: reqInvalid, res: resInvalid } = mockAPIArgs({
			method: "DELETE",
		});
		await quoteApi(reqInvalid, resInvalid);
		expect(invalidMethod).toBeCalledWith(reqInvalid, resInvalid, {
			allowMethod: ["POST"],
		});

		expect(createQuotes).toBeCalledTimes(1);
		expect(invalidMethod).toBeCalledTimes(1);
	});
});
