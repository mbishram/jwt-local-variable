import nock from "nock";
import { baseURL } from "@/libs/fetchers/http";
import { LoginFormType } from "@/forms/login";
import { LOGIN, GET_TOKEN, USER } from "@/libs/fetchers/auth";

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

export const userMethodHandler = () => {
	scope.get(USER).reply(200, "Success");
};

export const getTokenMethodHandler = () => {
	scope.get(GET_TOKEN).reply(200, "Success");
};
