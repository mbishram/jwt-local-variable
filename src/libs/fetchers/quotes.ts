import { QuoteModel } from "@/models/quote-model";
import axios from "axios";

const quotesInstance = axios.create();

quotesInstance.interceptors.request.use((request) => {
	if (request?.headers)
		request.headers.Authorization = "Bearer get From Somewhere";
	return request;
});

export const QUOTES = "/api/quotes";

export async function createQuote(data: QuoteModel) {
	return await quotesInstance.post(QUOTES, data);
}
