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

describe("useUser Hook", () => {
	const redirectTo = "/test";

	it("should fetch data using swr, refetch it every 2 second, and use a refresh token middleware", async () => {
		jest.spyOn(useSWR, "default");
		renderHook(() => useUser());
		expect(useSWR.default).toBeCalledWith(USER, {
			refreshInterval: 1000,
		});
		jest.clearAllMocks();
	});

	describe("on no params set", () => {
		it("should return mutateUser method and didn't redirect on failed fetch", async () => {
			const userCall = userExceptionHandler();

			const { result, waitFor } = customRenderHook(() => useUser());
			await waitFor(() => {
				expect(userCall.isDone()).toBeTruthy();
			});

			const { user, mutateUser } = result.current;
			expect(Router.asPath).toEqual("/initial");
			expect(user?.success).toBeFalsy();
			expect(mutateUser).toBeTruthy();
		});

		it("should return user, mutateUser method, and didn't redirect on successful fetch", async () => {
			const userCall = userHandler();

			const { result, waitFor } = customRenderHook(() => useUser());
			await waitFor(() => {
				expect(userCall.isDone()).toBeTruthy();
			});

			const { user, mutateUser } = result.current;
			expect(user?.success).toBeTruthy();
			expect(mutateUser).toBeTruthy();
			expect(Router.asPath).toEqual("/initial");
		});
	});

	describe("on redirectTo params is set", () => {
		it("should return mutateUser and redirect the page to redirectTo params on failed fetch", async () => {
			const userCall = userExceptionHandler();

			const { result, waitFor } = customRenderHook(() =>
				useUser(redirectTo)
			);
			await waitFor(() => {
				expect(userCall.isDone()).toBeTruthy();
			});

			const { user, mutateUser } = result.current;
			expect(user?.success).toBeFalsy();
			expect(mutateUser).toBeTruthy();
			expect(Router.asPath).toEqual(redirectTo);
		});

		it("should return mutateUser and didn't redirect on successful fetch", async () => {
			const userCall = userHandler();

			const { result, waitFor } = customRenderHook(() =>
				useUser(redirectTo)
			);
			await waitFor(() => {
				expect(userCall.isDone()).toBeTruthy();
			});

			const { user, mutateUser } = result.current;
			expect(user?.success).toBeTruthy();
			expect(mutateUser).toBeTruthy();
			expect(Router.asPath).toEqual("/initial");
		});
	});

	describe("on redirectTo and options params is set", () => {
		describe("(redirectIfFound)", () => {
			it("should return mutateUser and didn't redirect on failed fetch", async () => {
				const userCall = userExceptionHandler();

				const { result, waitFor } = customRenderHook(() =>
					useUser(redirectTo, { redirectIfFound: true })
				);
				await waitFor(() => {
					expect(userCall.isDone()).toBeTruthy();
				});

				const { user, mutateUser } = result.current;
				expect(user?.success).toBeFalsy();
				expect(mutateUser).toBeTruthy();
				expect(Router.asPath).toEqual("/initial");
			});

			it("should return mutateUser, user, and redirect the page to redirectTo params on successful fetch", async () => {
				const userCall = userHandler();

				const { result, waitFor } = customRenderHook(() =>
					useUser(redirectTo, { redirectIfFound: true })
				);
				await waitFor(() => {
					expect(userCall.isDone()).toBeTruthy();
				});

				const { user, mutateUser } = result.current;
				expect(user?.success).toBeTruthy();
				expect(mutateUser).toBeTruthy();
				expect(Router.asPath).toEqual(redirectTo);
			});
		});
	});
});
