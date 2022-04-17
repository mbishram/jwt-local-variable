/**
 * @jest-environment jsdom
 */

import {
	getToken,
	JWT_TOKEN_KEY,
	removeToken,
	setToken,
} from "@/libs/token/local-storage-handler";

describe("Local Storage Handler", () => {
	beforeEach(() => {
		localStorage.setItem(JWT_TOKEN_KEY, "testloremipsumtoken");
	});

	it("should able to set token to local storage", () => {
		localStorage.removeItem(JWT_TOKEN_KEY);

		setToken("test123token");
		const token = localStorage.getItem(JWT_TOKEN_KEY);
		expect(token).toEqual("test123token");
	});

	it("should able to get token from local storage", () => {
		expect(getToken()).toEqual("testloremipsumtoken");
	});

	it("should able to remove token from local storage", () => {
		expect(getToken()).toEqual("testloremipsumtoken");
		removeToken();
		const token = localStorage.getItem(JWT_TOKEN_KEY);
		expect(token).toBeFalsy();
	});
});
