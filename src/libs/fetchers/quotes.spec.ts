/**
 * @jest-environment jsdom
 */

import { createQuote } from "@/libs/fetchers/quotes";
import { QuoteModel } from "@/models/quote-model";
import { createMethodHandler } from "../../../specs/__mocks__/api/quotesFetcher";

describe("Quotes Fetcher", () => {
	const data = new QuoteModel({
		quote: "",
		name: "",
		bgColor: "",
		userId: "",
	});

	it("should be able to create quote", async () => {
		createMethodHandler(data);

		const res = await createQuote(data);
		expect(res.data).toEqual("Success");
	});
});
