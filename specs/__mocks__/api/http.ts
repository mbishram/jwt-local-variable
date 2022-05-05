import nock from "nock";
import { baseURL } from "@/libs/fetchers/http";

const scope = nock(baseURL);

export const authorizationHeaderCheckHandler = () => {
	scope.get("").reply(200, function () {
		return this?.req?.headers?.authorization;
	});
};
