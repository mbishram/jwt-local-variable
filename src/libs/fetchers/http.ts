import axios from "axios";
import {
	returnAccessToken,
	returnRefreshToken,
} from "@/libs/token/local-storage-handler";

export const baseURL = process?.env?.NEXT_PUBLIC_API_BASE_URL || "";

// Check if it's on next.js' server side. If it is, don't use getToken()
const isServer = typeof window === "undefined";

const httpInstance = axios.create({
	baseURL,
});
httpInstance.interceptors.request.use((request) => {
	const accessTokenString =
		"Bearer " + (!isServer ? returnAccessToken() : "");
	if (request?.headers) {
		request.headers.authorization = accessTokenString;
	}
	return request;
});

const httpRefreshInstance = axios.create({
	baseURL,
});

httpRefreshInstance.interceptors.request.use((request) => {
	const refreshTokenString =
		"Bearer " + (!isServer ? returnRefreshToken() : "");
	const accessTokenString =
		"Bearer " + (!isServer ? returnAccessToken() : "");
	if (request?.headers) {
		request.headers.authorization = refreshTokenString;
		request.headers["token-access"] = accessTokenString;
	}
	return request;
});

export { httpInstance, httpRefreshInstance };
