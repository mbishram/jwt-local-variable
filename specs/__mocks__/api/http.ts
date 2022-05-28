import nock from "nock";
import { baseURL } from "@/libs/fetchers/http";

const scope = nock(baseURL);

export const httpInstanceHandler = () => {
	scope.get("").reply(200, function () {
		return this?.req?.headers?.authorization;
	});
};

export const httpRefreshInstanceHandler = () => {
	scope.get("").reply(200, function () {
		return {
			refreshToken: this?.req?.headers?.authorization,
			accessToken: this?.req?.headers["token-access"],
		};
	});
};
