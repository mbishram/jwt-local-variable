import nock from "nock";
import { baseURL } from "@/libs/fetchers/http";
import { LoginFormType } from "@/forms/login";
import { LOGIN } from "@/libs/fetchers/auth";

const scope = nock(baseURL);

export const loginMethodHandler = (data: LoginFormType) => {
	scope
		.post(
			LOGIN,
			(body) =>
				body.username === data.username &&
				body.password === data.password
		)
		.reply(200, "Success");
};
