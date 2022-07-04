import Cookies from "js-cookie";

export function spyOnGetCookie(value: string) {
	jest.spyOn(Cookies, "get").mockReturnValueOnce(
		value as unknown as { [key: string]: string }
	);
}
