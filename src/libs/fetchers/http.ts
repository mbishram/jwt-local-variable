import axios from "axios";
import {
	getAccessToken,
	getCSRFToken,
	getRefreshToken,
} from "@/libs/token/variable-handler";

export const baseURL = process?.env?.NEXT_PUBLIC_API_BASE_URL || "";

// Check if it's on next.js' server side. If it is, don't use getToken()
const isServer = typeof window === "undefined";

const httpInstance = axios.create({
	baseURL,
});
httpInstance.interceptors.request.use((request) => {
	const accessTokenString = "Bearer " + (!isServer ? getAccessToken() : "");
	const csrfTokenString = "Bearer " + (!isServer ? getCSRFToken() : "");
	if (request?.headers) {
		request.headers.authorization = accessTokenString;
		request.headers["token-csrf"] = csrfTokenString;
	}
	return request;
});

const httpRefreshInstance = axios.create({
	baseURL,
});

httpRefreshInstance.interceptors.request.use((request) => {
	const refreshTokenString = "Bearer " + (!isServer ? getRefreshToken() : "");
	const accessTokenString = "Bearer " + (!isServer ? getAccessToken() : "");
	const csrfTokenString = "Bearer " + (!isServer ? getCSRFToken() : "");
	if (request?.headers) {
		request.headers.authorization = refreshTokenString;
		request.headers["token-access"] = accessTokenString;
		request.headers["token-csrf"] = csrfTokenString;
	}
	return request;
});

export { httpInstance, httpRefreshInstance };
