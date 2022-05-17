import { httpInstance, httpRefreshInstance } from "@/libs/fetchers/http";
import { LoginFormType } from "@/forms/login";
import { NextJson } from "@/models/next-json";
import { FetcherLoginResponseData } from "@/types/libs/mongodb/auth-fetcher";
import { UserModel } from "@/models/user-model";

export const LOGIN = "/auth/login";
export async function login(data: LoginFormType) {
	return await httpInstance.post<NextJson<FetcherLoginResponseData>>(
		LOGIN,
		data
	);
}

export const USER = "/auth/user";
export async function getUser() {
	return await httpInstance.get<NextJson<UserModel>>(USER);
}

export const GET_TOKEN = "/auth/get-token";
export async function getToken() {
	return await httpRefreshInstance.get(GET_TOKEN);
}

export function logout() {}
