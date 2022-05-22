/**
 * @jest-environment jsdom
 */

import { useUser } from "@/hooks/use-user";
import { renderHook } from "@testing-library/react-hooks/dom";
import {
	userExceptionHandler,
	userHandler,
} from "../../specs/__mocks__/api/user";
import * as useSWR from "swr";
import { customRenderHook } from "@specs-utils/custom-render-hook";
import { USER } from "@/libs/fetchers/auth";
import Router from "next/router";
import { refreshTokenMiddleware } from "@/libs/swr/middlewares/refresh-token";

describe("useUser Hook", () => {
	const redirectTo = "/test";

	it("should fetch data using swr, refetch it every 5 second, and use a refresh token middleware", async () => {
		jest.spyOn(useSWR, "default");
		renderHook(() => useUser());
		expect(useSWR.default).toBeCalledWith(USER, {
			refreshInterval: 5000,
			use: [refreshTokenMiddleware],
		});
		jest.clearAllMocks();
	});

	describe("on no params set", () => {
		it("should return mutateUser method, error, and didn't redirect on failed fetch", async () => {
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

		it("should return user, mutateUser method, and didn't redirect on successful fetch", async () => {
			userHandler();

			const { result, waitFor } = customRenderHook(() => useUser());
			await waitFor(() => {
				const { user, mutateUser, error } = result.current;

				expect(user?.data).toEqual("Success!");
				expect(mutateUser).toBeTruthy();
				expect(error).toBeFalsy();
				expect(Router.asPath).toEqual("/initial");
			});
		});
	});

	describe("on redirectTo params is set", () => {
		it("should return mutateUser, error, and redirect the page to redirectTo params on failed fetch", async () => {
			userExceptionHandler();

			const { result, waitFor } = customRenderHook(() =>
				useUser(redirectTo)
			);
			await waitFor(() => {
				const { user, mutateUser, error } = result.current;

				expect(user).toBeFalsy();
				expect(mutateUser).toBeTruthy();
				expect(error?.response?.data?.data).toEqual("Failed!");
				expect(Router.asPath).toEqual(redirectTo);
			});
		});

		it("should return mutateUser and didn't redirect on successful fetch", async () => {
			userHandler();

			const { result, waitFor } = customRenderHook(() =>
				useUser(redirectTo)
			);
			await waitFor(() => {
				const { user, mutateUser, error } = result.current;

				expect(user?.data).toEqual("Success!");
				expect(mutateUser).toBeTruthy();
				expect(error).toBeFalsy();
				expect(Router.asPath).toEqual("/initial");
			});
		});
	});

	describe("on redirectTo and options params is set", () => {
		describe("(redirectIfFound)", () => {
			it("should return mutateUser, error, and didn't redirect on failed fetch", async () => {
				userExceptionHandler();

				const { result, waitFor } = customRenderHook(() =>
					useUser(redirectTo, { redirectIfFound: true })
				);
				await waitFor(() => {
					const { user, mutateUser, error } = result.current;

					expect(user).toBeFalsy();
					expect(mutateUser).toBeTruthy();
					expect(error?.response?.data?.data).toEqual("Failed!");
					expect(Router.asPath).toEqual("/initial");
				});
			});

			it("should return mutateUser, user, and redirect the page to redirectTo params on successful fetch", async () => {
				userHandler();

				const { result, waitFor } = customRenderHook(() =>
					useUser(redirectTo, { redirectIfFound: true })
				);
				await waitFor(() => {
					const { user, mutateUser, error } = result.current;

					expect(user?.data).toEqual("Success!");
					expect(mutateUser).toBeTruthy();
					expect(error).toBeFalsy();
					expect(Router.asPath).toEqual(redirectTo);
				});
			});
		});
	});
});
