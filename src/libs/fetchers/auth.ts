/**
 * @jest-environment jsdom
 */

import { httpInstance } from "@/libs/fetchers/http";
import { LoginFormType } from "@/forms/login";
import { NextJson } from "@/models/next-json";
import { FetcherLoginResponseData } from "@/types/libs/mongodb/auth-fetcher";

export const LOGIN = "/auth/login";
export async function login(data: LoginFormType) {
	return await httpInstance.post<NextJson<FetcherLoginResponseData>>(
		LOGIN,
		data
	);
}

export function logout() {}

export function getUser() {}
