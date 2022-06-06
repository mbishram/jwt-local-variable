import { fetcher } from "@/libs/swr/fetcher";
import { basicGetHandler } from "../../../specs/__mocks__/api/basic";

describe("SWR Fetcher", () => {
	it("should use httpInstance and able to pass url as params", async () => {
		const url = "/";
		const call = basicGetHandler(url);
		await fetcher(url);

		expect(call.isDone()).toBeTruthy();
	});
});
