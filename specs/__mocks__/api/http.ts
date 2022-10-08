import nock from "nock";
import { baseURL } from "@/libs/fetchers/http";

const scope = nock(baseURL);

export const httpInstanceHandler = () => {
	scope.get("").reply(200, function () {
		return {
			accessToken: this?.req?.headers?.authorization,
			csrfToken: this?.req?.headers["token-csrf"],
		};
	});
};

export const httpRefreshInstanceHandler = () => {
	scope.get("").reply(200, function () {
		return {
			refreshToken: this?.req?.headers?.authorization,
			accessToken: this?.req?.headers["token-access"],
			csrfToken: this?.req?.headers["token-csrf"],
		};
	});
};
