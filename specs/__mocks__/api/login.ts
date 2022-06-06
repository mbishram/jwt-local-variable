import { LOGIN } from "@/libs/fetchers/auth";
import { NextJson } from "@/models/next-json";
import { baseURL } from "@/libs/fetchers/http";
import nock from "nock";
import { GenericObject } from "@/types/ui/generic-object";

const scope = nock(baseURL);

export const loginHandler = (expectedReturnData: GenericObject) => {
	scope.post(LOGIN).reply(
		200,
		new NextJson({
			success: true,
			message: "Login success!",
			data: [expectedReturnData],
		})
	);
};
export const loginExceptionHandler = () => {
	scope.post(LOGIN).reply(
		401,
		new NextJson({
			success: false,
			message: "Login failed!",
		})
	);
};
