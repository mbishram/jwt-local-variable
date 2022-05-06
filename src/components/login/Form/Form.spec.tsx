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
import { renderHook, act } from "@testing-library/react-hooks/dom";
import { useRouter } from "next/router";

jest.mock("next/router", () => require("next-router-mock"));

describe("Login Form", () => {
	let usernameInput: Element;
	let passwordInput: Element;
	let submitButton: Element;

	beforeEach(() => {
		render(<LoginForm className="bg-black" />);

		usernameInput = screen.getByLabelText("Email/Username");
		passwordInput = screen.getByLabelText("Password");
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

		it("should login and redirect when correct credential submitted", async () => {
			loginHandler();

			await waitFor(() => {
				userEvent.click(submitButton);
			});

			await act(async () => {
				const { result, waitForNextUpdate } = renderHook(() =>
					useRouter()
				);
				await waitForNextUpdate();
				expect(result.current).toMatchObject({ asPath: "/" });
			});
		});
	});
});
