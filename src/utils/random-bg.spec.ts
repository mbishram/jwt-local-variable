import { randomBg } from "@/utils/random-bg";

describe("RandomBg", () => {
	it("should return string with 'bg-{color}-500' pattern", () => {
		expect(randomBg()).toMatch(/^bg-.+-500$/g);
	});
});
