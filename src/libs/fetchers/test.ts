import { httpInstance } from "@/libs/fetchers/http";
import { NextJson } from "@/models/next-json";

export const RESET_TEST = "/reset-test";
export async function resetTest() {
	return await httpInstance.post<NextJson<undefined>>(RESET_TEST, null);
}
