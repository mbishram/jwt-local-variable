import userApi from "./user.page";
import { getUser } from "@/libs/mongodb/auth-fetcher";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import { invalidMethod } from "@/libs/mongodb/fetcher-utils";

jest.mock("@/libs/mongodb/auth-fetcher", () => ({
	getUser: jest.fn(),
	invalidMethod: jest.fn(),
}));

jest.mock("@/libs/mongodb/fetcher-utils", () => ({
	invalidMethod: jest.fn(),
}));

describe("API User", () => {
	it("should be able to separate method based on request method", () => {
		const { req: reqPost, res: resPost } = mockAPIArgs({ method: "GET" });
		userApi(reqPost, resPost);
		expect(getUser).toBeCalled();

		const { req: reqInvalid, res: resInvalid } = mockAPIArgs({
			method: "DELETE",
		});
		userApi(reqInvalid, resInvalid);
		expect(invalidMethod).toBeCalledWith(reqInvalid, resInvalid, {
			allowMethod: ["GET"],
		});

		expect(getUser).toBeCalledTimes(1);
		expect(invalidMethod).toBeCalledTimes(1);
	});
});
