let accessToken: string | undefined;

export function setAccessToken(value: string) {
	accessToken = value;
}

export function getAccessToken() {
	return accessToken;
}

export function removeAccessToken() {
	accessToken = undefined;
}

let refreshToken: string | undefined;

export function setRefreshToken(value: string) {
	refreshToken = value;
}

export function getRefreshToken() {
	return refreshToken;
}

export function removeRefreshToken() {
	refreshToken = undefined;
}
