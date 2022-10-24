import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export type refreshTokenOptions = { req: NextApiRequest; res: NextApiResponse };

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

export const JWT_REFRESH_TOKEN_COOKIE = "refreshToken";
export const REFRESH_TOKEN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // A week

export function saveRefreshToken(
	value: string,
	{ req, res }: refreshTokenOptions
) {
	setCookie(JWT_REFRESH_TOKEN_COOKIE, value, {
		req,
		res,
		httpOnly: true,
		secure: true,
		maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
	});
}

export function returnRefreshToken({ req, res }: refreshTokenOptions) {
	return getCookie(JWT_REFRESH_TOKEN_COOKIE, { req, res });
}

export function deleteRefreshToken({ req, res }: refreshTokenOptions) {
	deleteCookie(JWT_REFRESH_TOKEN_COOKIE, { req, res });
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
