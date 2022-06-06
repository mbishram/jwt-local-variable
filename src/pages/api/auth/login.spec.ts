import loginApi from "./login.page";
import { login } from "@/libs/mongodb/auth-fetcher";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import { invalidMethod } from "@/libs/mongodb/fetcher-utils";

jest.mock("@/libs/mongodb/auth-fetcher", () => ({
	login: jest.fn(),
}));

jest.mock("@/libs/mongodb/fetcher-utils", () => ({
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
		expect(invalidMethod).toBeCalledWith(reqInvalid, resInvalid, {
			allowMethod: ["POST"],
		});

		expect(login).toBeCalledTimes(1);
		expect(invalidMethod).toBeCalledTimes(1);
	});
});
