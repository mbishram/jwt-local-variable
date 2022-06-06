/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { itRenderInput } from "@specs-utils/it-render-input";
import { CreateForm } from "@/components/create/Form/Form";
import { CREATE_INPUT_ATTR } from "@/forms/create";
import {
	createQuoteExceptionHandler,
	createQuoteHandler,
} from "../../../../specs/__mocks__/api/quotes";
import userEvent from "@testing-library/user-event";
import Router from "next/router";

describe("Create Form", () => {
	let submitButton: Element;

	beforeEach(() => {
		render(
			<CreateForm
				className="bg-black"
				beforeForm={<div data-testid="before-form" />}
			/>
		);
		submitButton = screen.getByText("Submit");
	});

	itRenderInput(
		{
			initialValues: {
				name: "",
				quote: "",
			},
			inputAttr: CREATE_INPUT_ATTR,
		},
		"should render name and quote input"
	);

	it("should pass className to form element", () => {
		expect(screen.getByRole("form")).toHaveClass("bg-black");
	});

	it("should pass the component as form first children if it's passed using beforeForm props", () => {
		expect(screen.getByRole("form").firstChild).toBe(
			screen.getByTestId("before-form")
		);
	});

	describe("on submit", () => {
		it("should show error alert when create quote failed", async () => {
			createQuoteExceptionHandler();

			const alertBeforeSubmit = screen.queryByRole("alert");
			expect(alertBeforeSubmit).toBeFalsy();

			userEvent.click(submitButton);

			await waitFor(() => {
				const alertAfterSubmit = screen.queryByRole("alert");
				expect(alertAfterSubmit).toHaveClass("danger");
				expect(alertAfterSubmit).toBeTruthy();
			});
		});

		it("should clear input and show success alert when create quote success", async () => {
			createQuoteHandler();

			const alertBeforeSubmit = screen.queryByRole("alert");
			expect(alertBeforeSubmit).toBeFalsy();

			userEvent.click(submitButton);

			await waitFor(() => {
				const alertAfterSubmit = screen.queryByRole("alert");
				expect(alertAfterSubmit).toBeTruthy();
				expect(alertAfterSubmit).toHaveClass("success");
				expect(Router).toMatchObject({ asPath: "/initial" });
			});
		});
	});
});
