/**
 * @jest-environment jsdom
 */

import { createQuote, deleteAllQuote } from "@/libs/fetchers/quotes";
import { QuoteModel } from "@/models/quote-model";
import {
	createMethodHandler,
	deleteMethodHandler,
} from "../../../specs/__mocks__/api/quotes-fetcher";

describe("Quotes Fetcher", () => {
	const data = new QuoteModel({
		quote: "",
		name: "",
		bgColor: "",
		userId: "",
		username: "",
	});

	it("should be able to create quote", async () => {
		createMethodHandler(data);

		const res = await createQuote(data);
		expect(res.data).toEqual("Success");
	});

	it("should be able to delete all quote", async () => {
		deleteMethodHandler();

		const res = await deleteAllQuote();
		expect(res.data).toEqual("Success");
	});
});
