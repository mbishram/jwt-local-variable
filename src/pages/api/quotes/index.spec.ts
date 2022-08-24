import quoteApi from "./index.page";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import { invalidMethod } from "@/libs/mongodb/fetcher-utils";
import { createQuotes, deleteQuotes } from "@/libs/mongodb/quotes-fetcher";

jest.mock("@/libs/mongodb/quotes-fetcher", () => ({
	createQuotes: jest.fn(),
	deleteQuotes: jest.fn(),
}));

jest.mock("@/libs/mongodb/fetcher-utils", () => ({
	invalidMethod: jest.fn(),
}));

describe("API Quotes", () => {
	it("should be able to separate method based on request method", async () => {
		const headers = {
			authorization: "Bearer " + process.env.JWT_VALID_ACCESS,
		};

		const { req: reqPost, res: resPost } = mockAPIArgs({
			method: "POST",
			headers,
		});
		await quoteApi(reqPost, resPost);
		expect(createQuotes).toBeCalled();

		const { req: reqDelete, res: resDelete } = mockAPIArgs({
			method: "DELETE",
			headers,
		});
		await quoteApi(reqDelete, resDelete);
		expect(deleteQuotes).toBeCalled();

		const { req: reqInvalid, res: resInvalid } = mockAPIArgs({
			method: "GET",
		});
		await quoteApi(reqInvalid, resInvalid);
		expect(invalidMethod).toBeCalledWith(reqInvalid, resInvalid, {
			allowMethod: ["POST"],
		});

		expect(createQuotes).toBeCalledTimes(1);
		expect(deleteQuotes).toBeCalledTimes(1);
		expect(invalidMethod).toBeCalledTimes(1);
	});
});
