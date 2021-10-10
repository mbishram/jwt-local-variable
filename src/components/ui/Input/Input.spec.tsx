import React from "react";
import { itPassProps } from "@specs-utils/it-pass-props";
import { Input } from "@/components/ui/Input/Input";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Input", () => {
	itPassProps(Input);

	it("should able to write input", () => {
		render(<Input data-testid="test-value" />);
		const input = screen.getByTestId("test-value") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "test value" } });
		expect(input.value).toBe("test value");
	});

	it("should make it full width when fullWidth prop set", () => {
		render(<Input fullWidth data-testid="test-full" />);
		expect(screen.getByTestId("test-full")).toHaveClass("fullWidth");

		render(<Input data-testid="test-non-full" />);
		expect(screen.getByTestId("test-non-full")).not.toHaveClass(
			"fullWidth"
		);
	});
});
