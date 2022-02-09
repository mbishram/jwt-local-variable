/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { itRenderInput } from "@specs-utils/it-render-input";
import { LOGIN_INPUT_ATTR } from "@/forms/login";
import { LoginForm } from "@/components/login/Form/Form";

describe("Login Form", () => {
	beforeEach(() => {
		render(<LoginForm className="bg-black" />);
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

	it.todo("should login and redirect when correct credential submitted");

	it.todo("should show error alert when wrong credential submitted");
});
