/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { itRenderInput } from "@specs-utils/it-render-input";
import { LOGIN_INPUT_ATTR } from "@/forms/login";
import { LoginForm } from "@/components/login/Form/Form";
import userEvent from "@testing-library/user-event";
import {
	loginExceptionHandler,
	loginHandler,
} from "../../../../specs/__mocks__/api/login";
import Router from "next/router";
import {
	returnAccessToken,
	returnRefreshToken,
} from "@/libs/token/local-storage-handler";

describe("Login Form", () => {
	let submitButton: Element;
	const mutateUser = jest.fn();

	beforeEach(() => {
		render(<LoginForm className="bg-black" mutateUser={mutateUser} />);

		submitButton = screen.getByText("Submit");
	});

	itRenderInput(
		{
			initialValues: { username: "", password: "" },
			inputAttr: LOGIN_INPUT_ATTR,
		},
		"should render user and password input"
	);

	it("should pass className to form element", () => {
		expect(screen.getByRole("form")).toHaveClass("bg-black");
	});

	describe("on submit", () => {
		beforeEach(() => {
			jest.restoreAllMocks();
		});

		it("should show error alert when wrong credential submitted", async () => {
			loginExceptionHandler();

			const alertBeforeSubmit = screen.queryByRole("alert");
			expect(alertBeforeSubmit).toBeFalsy();

			userEvent.click(submitButton);

			await waitFor(() => {
				const alertAfterSubmit = screen.queryByRole("alert");
				expect(alertAfterSubmit).toBeTruthy();
				expect(alertAfterSubmit).toHaveClass("danger");
			});
		});

		it("should login, redirect, and mutateUser when correct credential submitted", async () => {
			loginHandler({
				accessToken: "accessToken",
				refreshToken: "refreshToken",
			});

			userEvent.click(submitButton);

			await waitFor(() => {
				expect(returnAccessToken()).toBeTruthy();
				expect(returnRefreshToken()).toBeTruthy();
				expect(mutateUser).toBeCalledTimes(1);
				expect(Router).toMatchObject({ asPath: "/" });
			});
		});
	});
});
