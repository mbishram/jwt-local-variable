import axios from "axios";
import { getAccessToken, getCSRFToken } from "@/libs/token/variable-handler";

export const baseURL = process?.env?.NEXT_PUBLIC_API_BASE_URL || "";

// Check if it's on nextJS' server side. If it is, don't use getToken()
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

export { httpInstance };
