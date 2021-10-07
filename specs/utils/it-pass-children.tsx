import React, { ComponentType } from "react";
import { render, screen } from "@testing-library/react";

/**
 * Generate spec to test if a component passes it's children.
 * @param Component
 */
export const itPassChildren = (Component: ComponentType) => {
	return it("should pass it's children", () => {
		render(<Component>Test Children</Component>);
		expect(screen.getByText("Test Children")).toBeInTheDocument();

		render(
			<Component>
				<span data-testid="button-child">Test Children</span>
			</Component>
		);
		expect(screen.getByTestId("button-child")).toBeInTheDocument();
	});
};
