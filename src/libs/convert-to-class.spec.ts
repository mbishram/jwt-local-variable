import { convertToClass } from "@/libs/convert-to-class";
import { QuoteModel } from "@/models/quote-model";

describe("Convert to class", () => {
	const data = [
		{ name: "Name 1", quote: "Quote 1", bgColor: "LoremIpsum" },
		{ name: "Name 2", quote: "Quote 2", bgColor: "LoremIpsum" },
	];

	it("should return array of Model", () => {
		const arrayClass = convertToClass(data, QuoteModel);
		expect(arrayClass.length).toBe(2);
		expect(arrayClass[0] instanceof QuoteModel).toBeTruthy();
	});
});
