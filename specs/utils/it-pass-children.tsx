import React, { ComponentType, HTMLProps } from "react";
import { render, screen } from "@testing-library/react";

/**
 * Generate spec to test if a component passes it's children.
 * @param Component
 * @param additionalProps To add required props into component
 */
export const itPassChildren = (
	Component: ComponentType<any>,
	additionalProps?: HTMLProps<any>
) =>
	it("should pass it's children", () => {
		render(<Component {...additionalProps}>Test Children</Component>);
		expect(screen.getByText("Test Children")).toBeInTheDocument();

		render(
			<Component {...additionalProps}>
				<span data-testid="button-child">Test Children</span>
			</Component>
		);
		expect(screen.getByTestId("button-child")).toBeInTheDocument();
	});
