let accessToken: string | null;

export function setAccessToken(value: string) {
	accessToken = value;
}

export function getAccessToken() {
	return accessToken;
}

export function removeAccessToken() {
	accessToken = null;
}

let csrfToken: string | null;

export function setCSRFToken(value: string) {
	csrfToken = value;
}

export function getCSRFToken() {
	return csrfToken;
}

export function removeCSRFToken() {
	csrfToken = null;
}
