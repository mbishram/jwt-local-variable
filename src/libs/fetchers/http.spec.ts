/**
 * @jest-environment jsdom
 */

import { httpInstance } from "@/libs/fetchers/http";
import { authorizationHeaderCheckHandler } from "../../../specs/__mocks__/api/http";
import { getAccessToken } from "@/libs/token/local-storage-handler";

describe("HTTP", () => {
	it("should have authorization headers", async () => {
		const accessTokenString = "Bearer " + getAccessToken();
		authorizationHeaderCheckHandler();
		const res = await httpInstance.get("");
		expect(res?.data).toEqual(accessTokenString);
	});
});
