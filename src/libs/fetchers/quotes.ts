import { QuoteModel } from "@/models/quote-model";
import { httpInstance } from "@/libs/fetchers/http";
import { NextJson } from "@/models/next-json";

export const QUOTES = "/quotes";
export async function createQuote(data: QuoteModel) {
	return await httpInstance.post<NextJson<undefined>>(QUOTES, data);
}
