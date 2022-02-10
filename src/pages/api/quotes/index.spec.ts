import quoteApi from "./index.page";
import { NextApiRequest, NextApiResponse } from "next";
import { createQuotes, invalidMethod } from "@/libs/mongodb/fetcher";

jest.mock("@/libs/mongodb/fetcher", () => ({
	createQuotes: jest.fn(),
	invalidMethod: jest.fn(),
}));

describe("API Quotes", () => {
	it("should be able to separate method based on request method", () => {
		const reqPost = {
			method: "POST",
		} as NextApiRequest;
		const resPost = {} as NextApiResponse;
		quoteApi(reqPost, resPost);
		expect(createQuotes).toBeCalled();

		const reqInvalid = {
			method: "TEST",
		} as NextApiRequest;
		const resInvalid = {} as NextApiResponse;
		quoteApi(reqInvalid, resInvalid);
		expect(invalidMethod).toBeCalled();

		expect(createQuotes).toBeCalledTimes(1);
		expect(invalidMethod).toBeCalledTimes(1);
	});
});
