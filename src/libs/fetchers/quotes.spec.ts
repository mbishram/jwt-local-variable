import { createQuote, QUOTES } from "@/libs/fetchers/quotes";
import { QuoteModel } from "@/models/quote-model";
import mockAxios from "../../../specs/__mocks__/axios";

describe("Quotes Fetcher", () => {
	const data = new QuoteModel({
		quote: "",
		name: "",
		bgColor: "",
		userId: "",
	});

	beforeEach(() => {
		createQuote(data);
	});

	it("should have Authorization headers", () => {
		expect(mockAxios.interceptors.request.use).toHaveBeenCalledTimes(1);
	});

	it("should be able to create quote", () => {
		expect(mockAxios.create().post).toBeCalledWith(QUOTES, data);
	});
});
