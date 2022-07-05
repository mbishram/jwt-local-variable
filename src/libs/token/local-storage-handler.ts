import Cookies from "js-cookie";

export const JWT_ACCESS_TOKEN_KEY = "JWT_ACCESS_TOKEN_KEY";
export const JWT_ACCESS_TOKEN_COOKIE = "accessToken";

export function setAccessToken(value: string) {
	Cookies.set(JWT_ACCESS_TOKEN_COOKIE, value, {
		sameSite: "None",
		secure: true,
	});
	localStorage.setItem(JWT_ACCESS_TOKEN_KEY, value);
}

export function getAccessToken() {
	return (
		localStorage.getItem(JWT_ACCESS_TOKEN_KEY) ||
		Cookies.get(JWT_ACCESS_TOKEN_COOKIE)
	);
}

export function removeAccessToken() {
	Cookies.remove(JWT_ACCESS_TOKEN_COOKIE);
	localStorage.removeItem(JWT_ACCESS_TOKEN_KEY);
}

export const JWT_REFRESH_TOKEN_KEY = "JWT_REFRESH_TOKEN_KEY";

export function setRefreshToken(value: string) {
	localStorage.setItem(JWT_REFRESH_TOKEN_KEY, value);
}

export function getRefreshToken() {
	return localStorage.getItem(JWT_REFRESH_TOKEN_KEY);
}

export function removeRefreshToken() {
	localStorage.removeItem(JWT_REFRESH_TOKEN_KEY);
}
