import { convertToClass } from "@/libs/convert-to-class";
import { QuoteClass } from "@/classes/quote-class";

describe("Convert to class", () => {
	const data = [
		{ name: "Name 1", quote: "Quote 1", bgColor: "LoremIpsum" },
		{ name: "Name 2", quote: "Quote 2", bgColor: "LoremIpsum" },
	];

	it("should return array of Model", () => {
		const arrayClass = convertToClass(data, QuoteClass);
		expect(arrayClass.length).toBe(2);
		expect(arrayClass[0] instanceof QuoteClass).toBeTruthy();
	});
});
