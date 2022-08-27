import nock from "nock";
import { baseURL } from "@/libs/fetchers/http";
import { CreateQuoteFormType } from "@/forms/create";
import { QUOTES } from "@/libs/fetchers/quotes";

const scope = nock(baseURL);

export const createMethodHandler = (data: CreateQuoteFormType) => {
	scope
		.post(
			QUOTES,
			(body) =>
				body.name === data.name &&
				body.quote === data.quote &&
				body.bgColor === data.bgColor &&
				body.userId === data.userId
		)
		.reply(200, "Success");
};

export const deleteMethodHandler = () => {
	scope.delete(QUOTES).reply(200, "Success");
};