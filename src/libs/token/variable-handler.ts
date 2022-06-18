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

let refreshToken: string | null;

export function setRefreshToken(value: string) {
	refreshToken = value;
}

export function getRefreshToken() {
	return refreshToken;
}

export function removeRefreshToken() {
	refreshToken = null;
}
