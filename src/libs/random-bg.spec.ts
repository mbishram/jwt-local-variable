import { randomBg } from "@/libs/random-bg";

describe("RandomBg", () => {
	it("should return string with 'bg-{color}-[678]00' pattern", () => {
		expect(randomBg()).toMatch(/^bg-.+-[678]00$/g);
	});
});
