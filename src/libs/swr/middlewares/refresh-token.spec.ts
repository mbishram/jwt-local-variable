import { userExceptionHandler } from "../../../../specs/__mocks__/api/user";
import { customRenderHook } from "@specs-utils/custom-render-hook";
import { useUser } from "@/hooks/use-user";
import Router from "next/router";

describe("Refresh Token Middleware", () => {
	it("should try to fetch new token on user fetch failed", async () => {
		// User Nock to test it
		userExceptionHandler();

		const { result, waitFor } = customRenderHook(() => useUser());
		await waitFor(() => {
			const { user, mutateUser, error } = result.current;

			expect(user?.data).toBeFalsy();
			expect(mutateUser).toBeTruthy();
			expect(error?.response?.data?.data).toEqual("Failed!");
			expect(Router.asPath).toEqual("/initial");
		});
	});
});
