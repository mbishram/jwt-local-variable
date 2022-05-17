import axios from "axios";
import {
	getAccessToken,
	getRefreshToken,
} from "@/libs/token/local-storage-handler";

export const baseURL = process?.env?.NEXT_PUBLIC_API_BASE_URL || "";

// Check if it's on next.js' server side. If it is, don't use getToken()
const isServer = typeof window === "undefined";
export const accessTokenString =
	"Bearer " + (!isServer ? getAccessToken() : "");
export const refreshTokenString =
	"Bearer " + (!isServer ? getRefreshToken() : "");

const httpInstance = axios.create({
	baseURL,
});
httpInstance.interceptors.request.use((request) => {
	if (request?.headers) {
		request.headers.Authorization = accessTokenString;
	}
	return request;
});

const httpRefreshInstance = axios.create({
	baseURL,
});

httpRefreshInstance.interceptors.request.use((request) => {
	if (request?.headers) {
		request.headers.Authorization = refreshTokenString;
	}
	return request;
});

export { httpInstance, httpRefreshInstance };
