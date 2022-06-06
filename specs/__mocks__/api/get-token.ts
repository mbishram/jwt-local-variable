import nock from "nock";
import { baseURL } from "@/libs/fetchers/http";
import { GET_TOKEN } from "@/libs/fetchers/auth";

const scope = nock(baseURL);

export const getTokenHandler = () => {
	return scope.get(GET_TOKEN).reply(200, {
		success: true,
		data: [{ accessToken: "Access Token", refreshToken: "Refresh Token" }],
	});
};

export const getTokenExceptionHandler = () => {
	return scope.get(GET_TOKEN).reply(401, { success: false, data: "Failed!" });
};
