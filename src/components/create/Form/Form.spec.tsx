/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { itRenderInput } from "@specs-utils/it-render-input";
import { CreateForm } from "@/components/create/Form/Form";
import { CREATE_INPUT_ATTR } from "@/forms/create";

describe("Create Form", () => {
	beforeEach(() => {
		render(
			<CreateForm
				className="bg-black"
				beforeForm={<div data-testid="before-form" />}
			/>
		);
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
});
