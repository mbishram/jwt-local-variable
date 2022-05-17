/**
 * @jest-environment jsdom
 */

import { accessTokenString, httpInstance } from "@/libs/fetchers/http";
import { authorizationHeaderCheckHandler } from "../../../specs/__mocks__/api/http";

describe("HTTP", () => {
	it("should have Authorization headers", async () => {
		authorizationHeaderCheckHandler();
		const res = await httpInstance.get("");
		expect(res?.data).toEqual(accessTokenString);
	});
});
