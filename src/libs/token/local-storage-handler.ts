export const JWT_ACCESS_TOKEN_KEY = "JWT_ACCESS_TOKEN_KEY";

export function saveAccessToken(value: string) {
	localStorage.setItem(JWT_ACCESS_TOKEN_KEY, value);
}

export function returnAccessToken() {
	return localStorage.getItem(JWT_ACCESS_TOKEN_KEY);
}

export function deleteAccessToken() {
	localStorage.removeItem(JWT_ACCESS_TOKEN_KEY);
}

export const JWT_REFRESH_TOKEN_KEY = "JWT_REFRESH_TOKEN_KEY";

export function saveRefreshToken(value: string) {
	localStorage.setItem(JWT_REFRESH_TOKEN_KEY, value);
}

export function returnRefreshToken() {
	return localStorage.getItem(JWT_REFRESH_TOKEN_KEY);
}

export function deleteRefreshToken() {
	localStorage.removeItem(JWT_REFRESH_TOKEN_KEY);
}
