export const JWT_TOKEN_KEY = "JWT_TOKEN_KEY ";

export function setToken(value: string) {
	localStorage.setItem(JWT_TOKEN_KEY, value);
}

export function getToken() {
	return localStorage.getItem(JWT_TOKEN_KEY);
}

export function removeToken() {
	localStorage.removeItem(JWT_TOKEN_KEY);
}
