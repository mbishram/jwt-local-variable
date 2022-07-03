export const JWT_ACCESS_TOKEN_KEY = "JWT_ACCESS_TOKEN_KEY";

export function setAccessToken(value: string) {
	// TODO: Set cookie!
	document.cookie = `token=${value}; SameSite=None; Secure`;
	localStorage.setItem(JWT_ACCESS_TOKEN_KEY, value);
	console.log("_TST", document.cookie);
}

export function getAccessToken() {
	return localStorage.getItem(JWT_ACCESS_TOKEN_KEY);
}

export function removeAccessToken() {
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
