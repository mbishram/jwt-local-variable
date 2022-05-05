import loginApi from "./login.page";
import { login, invalidMethod } from "@/libs/mongodb/auth-fetcher";
import { mockAPIArgs } from "@specs-utils/mock-api-args";

jest.mock("@/libs/mongodb/auth-fetcher", () => ({
	login: jest.fn(),
	invalidMethod: jest.fn(),
}));

describe("API Login", () => {
	it("should be able to separate method based on request method", () => {
		const { req: reqPost, res: resPost } = mockAPIArgs({ method: "POST" });
		loginApi(reqPost, resPost);
		expect(login).toBeCalled();

		const { req: reqInvalid, res: resInvalid } = mockAPIArgs({
			method: "DELETE",
		});
		loginApi(reqInvalid, resInvalid);
		expect(invalidMethod).toBeCalled();

		expect(login).toBeCalledTimes(1);
		expect(invalidMethod).toBeCalledTimes(1);
	});
});
