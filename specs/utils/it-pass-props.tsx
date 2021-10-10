import React, { ComponentType } from "react";
import { render, screen } from "@testing-library/react";

/**
 * Generate spec to test if a component passes it's props.
 * @param Component
 */
export const itPassProps = (Component: ComponentType<any>) =>
	it("should pass it's props", () => {
		render(<Component data-testid="test-props" data-test="test data" />);
		const footer = screen.getByTestId("test-props");
		expect(footer).toHaveAttribute("data-test", "test data");
	});
