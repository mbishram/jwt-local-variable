/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { FormikBuilder } from "@/components/ui/FormikBuilder/FormikBuilder";
import { InputAttr } from "@/types/forms/input-attr";
import { INPUT_TYPES } from "@/constants/input-types";
import userEvent from "@testing-library/user-event";
import { FormikHandleSubmit } from "@/types/forms/formik-handle-submit";
import { itRenderInput } from "@specs-utils/it-render-input";

describe("Formik Input Builder", () => {
	const inputAttr: InputAttr = {
		text: { label: "Text", type: INPUT_TYPES.TEXT },
		textarea: { label: "Text Area", type: INPUT_TYPES.TEXTAREA },
		password: { label: "Password", type: INPUT_TYPES.PASSWORD },
	};
	const initialValues = {
		text: "",
		textarea: "",
		password: "",
	};
	const onSubmit = jest.fn();
	const handleSubmit: FormikHandleSubmit<typeof initialValues> = async (
		values
	) => {
		new Promise((r) => setTimeout(r, 500));
		onSubmit(values);
	};

	beforeEach(() => {
		render(
			<FormikBuilder
				beforeForm={<div data-testid="before-form" />}
				inputAttr={inputAttr}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				className="bg-black"
			/>
		);
	});

	itRenderInput({ initialValues, inputAttr });

	it("should render input type text properly", () => {
		expect(screen.getByLabelText(inputAttr.text.label)).toHaveAttribute(
			"type",
			"text"
		);
	});

	it("should render input textarea properly", () => {
		expect(screen.getByLabelText(inputAttr.textarea.label)).toHaveAttribute(
			"role",
			"textbox"
		);
	});

	it("should render input type password properly", () => {
		expect(screen.getByLabelText(inputAttr.password.label)).toHaveAttribute(
			"type",
			"password"
		);
	});

	it("should be able to submit input", async () => {
		Object.keys(initialValues).forEach((initialValue) => {
			const { label } = inputAttr[initialValue];
			const input = screen.getByLabelText(label) as HTMLInputElement;
			userEvent.type(input, "test value");
		});

		userEvent.click(screen.getByRole("button"));

		await waitFor(() => {
			expect(onSubmit).toHaveBeenCalledWith({
				text: "test value",
				textarea: "test value",
				password: "test value",
			});
		});
	});

	it("should pass className to form element", () => {
		expect(screen.getByRole("form")).toHaveClass("bg-black");
	});

	it("should pass the component as form first children if it's passed using beforeForm props", () => {
		expect(screen.getByRole("form").firstChild).toBe(
			screen.getByTestId("before-form")
		);
	});
});
