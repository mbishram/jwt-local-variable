import React from "react";
import { itPassProps } from "@specs-utils/it-pass-props";
import { TextArea } from "@/components/ui/TextArea/TextArea";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Text Area", () => {
	beforeEach(() => {
		render(<TextArea data-testid="textarea" />);
	});

	itPassProps(TextArea);

	it("should able to write input", () => {
		const input = screen.getByTestId("textarea");
		userEvent.type(input, "test value");
		expect(input).toHaveValue("test value");
	});

	it.todo("should make it full width when fullWidth prop set");
});
