export const JWT_ACCESS_TOKEN_KEY = "JWT_ACCESS_TOKEN_KEY";
export const JWT_ACCESS_TOKEN_COOKIE = "accessToken";

// I didn't set cookie here, unlike jwt-on-localstorage branch because
// this isn't the main way of storing jwt. It was primarily saved
// on local variable.

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

export const CSRF_TOKEN_KEY = "CSRF_TOKEN_KEY";

export function saveCSRFToken(value: string) {
	localStorage.setItem(CSRF_TOKEN_KEY, value);
}

export function returnCSRFToken() {
	return localStorage.getItem(CSRF_TOKEN_KEY);
}

export function deleteCSRFToken() {
	localStorage.removeItem(CSRF_TOKEN_KEY);
}
