import { NextJson } from "@/models/next-json";
import { baseURL } from "@/libs/fetchers/http";
import nock from "nock";
import { QUOTES } from "@/libs/fetchers/quotes";

const scope = nock(baseURL);

export const createQuoteHandler = () => {
	scope.post(QUOTES).reply(
		200,
		new NextJson({
			success: true,
			message: "Success!",
		})
	);
};
export const createQuoteExceptionHandler = () => {
	scope.post(QUOTES).reply(
		401,
		new NextJson({
			success: false,
			message: "Failed!",
		})
	);
};
