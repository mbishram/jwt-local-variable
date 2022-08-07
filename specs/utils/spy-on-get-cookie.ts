import * as cookiesNext from "cookies-next";

export function spyOnGetCookie(returnValue: any) {
	jest.spyOn(cookiesNext, "getCookie").mockImplementation(() => returnValue);
}
