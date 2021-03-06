import nock from "nock";
import { baseURL } from "@/libs/fetchers/http";
import { USER } from "@/libs/fetchers/auth";

const scope = nock(baseURL);

export const userHandler = () => {
	return scope
		.get(USER)
		.reply(200, {
			success: true,
			data: [{ name: "Muhammad Bishram Yashir Alfarizi Aminuddin" }],
		});
};

export const userExceptionHandler = () => {
	return scope.get(USER).reply(200, { success: false, data: "Failed!" });
};
