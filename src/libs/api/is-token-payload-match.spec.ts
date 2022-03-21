import { isTokenPayloadMatch } from "@/libs/api/is-token-payload-match";

describe("Is Token Payload Match", () => {
	it("should return correct result", () => {
		const data1 = { test: "Test", test2: undefined };
		const payload1 = { test: "Test" };
		expect(isTokenPayloadMatch(data1, payload1)).toBeTruthy();

		const data2 = { test: "Test", test2: "TEST" };
		const payload2 = { test: "Test" };
		expect(isTokenPayloadMatch(data2, payload2)).toBeFalsy();

		const data3 = { test: "Test", test2: "TEST" };
		const payload3 = { test: "Test", test2: "test" };
		expect(isTokenPayloadMatch(data3, payload3)).toBeFalsy();

		const data4 = { test: "Test", test2: "TEST" };
		const payload4 = { test: "Test", test2: "TEST", test3: "test" };
		expect(isTokenPayloadMatch(data4, payload4)).toBeTruthy();
	});
});
