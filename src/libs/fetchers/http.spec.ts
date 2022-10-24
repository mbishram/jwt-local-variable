/**
 * @jest-environment jsdom
 */

import { httpInstance } from "@/libs/fetchers/http";
import { httpInstanceHandler } from "../../../specs/__mocks__/api/http";
import { setAccessToken, setCSRFToken } from "@/libs/token/variable-handler";

describe("HTTP", () => {
	const accessToken = "AccessToken";
	const csrfToken = "CSRFToken";
	const accessTokenHeader = "Bearer " + accessToken;
	const csrfTokenHeader = "Bearer " + csrfToken;

	beforeEach(() => {
		setAccessToken(accessToken);
		setCSRFToken(csrfToken);
	});

	describe("httpInstance", () => {
		it("should have authorization headers", async () => {
			httpInstanceHandler();
			const res = await httpInstance.get<any>("");
			expect(res?.data?.accessToken).toEqual(accessTokenHeader);
			expect(res?.data?.csrfToken).toEqual(csrfTokenHeader);
		});
	});
});
