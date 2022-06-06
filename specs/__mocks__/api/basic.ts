import nock from "nock";
import { baseURL } from "@/libs/fetchers/http";

const scope = nock(baseURL);

export const basicGetHandler = (url: string) => {
	return scope.get(url).reply(200, "Success!");
};
