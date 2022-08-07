import logoutApi from "./logout.page";
import { logout } from "@/libs/mongodb/auth-fetcher";
import { mockAPIArgs } from "@specs-utils/mock-api-args";
import { invalidMethod } from "@/libs/mongodb/fetcher-utils";

jest.mock("@/libs/mongodb/auth-fetcher", () => ({
	logout: jest.fn(),
}));

jest.mock("@/libs/mongodb/fetcher-utils", () => ({
	invalidMethod: jest.fn(),
}));

describe("API Logout", () => {
	it("should be able to separate method based on request method", () => {
		const { req: reqPost, res: resPost } = mockAPIArgs({ method: "GET" });
		logoutApi(reqPost, resPost);
		expect(logout).toBeCalled();

		const { req: reqInvalid, res: resInvalid } = mockAPIArgs({
			method: "DELETE",
		});
		logoutApi(reqInvalid, resInvalid);
		expect(invalidMethod).toBeCalledWith(reqInvalid, resInvalid, {
			allowMethod: ["GET"],
		});

		expect(logout).toBeCalledTimes(1);
		expect(invalidMethod).toBeCalledTimes(1);
	});
});
