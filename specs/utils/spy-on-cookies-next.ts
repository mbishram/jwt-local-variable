import * as cookiesNext from "cookies-next";

export function spyOnSetCookie() {
	jest.spyOn(cookiesNext, "setCookie").mockImplementation(jest.fn());
}

export function spyOnGetCookie(returnValue: string = "") {
	jest.spyOn(cookiesNext, "getCookie").mockImplementation(
		jest.fn(() => returnValue)
	);
}

export function spyOnDeleteCookie() {
	jest.spyOn(cookiesNext, "deleteCookie").mockImplementation(jest.fn());
}
