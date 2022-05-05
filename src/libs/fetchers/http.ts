import axios from "axios";
import { getToken } from "@/libs/token/local-storage-handler";

export const baseURL = process?.env?.NEXT_PUBLIC_API_BASE_URL || "";

const httpInstance = axios.create({
	baseURL,
});

// Check if it's on next.js' server side. If it is, don't use getToken()
const isServer = typeof window === "undefined";
export const authorizationHeaderString =
	"Bearer " + (!isServer ? getToken() : "");

httpInstance.interceptors.request.use((request) => {
	if (request?.headers) {
		request.headers.Authorization = authorizationHeaderString;
	}
	return request;
});

export { httpInstance };
