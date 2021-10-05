import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/Button/Button";

describe("Button", () => {
	it("should show it's children", () => {
		render(<Button>Test Children</Button>);
		expect(screen.getByText("Test Children")).toBeInTheDocument();

		render(
			<Button>
				<div data-testid="button-child">Test Children</div>
			</Button>
		);
		expect(screen.getByTestId("button-child")).toBeInTheDocument();
	});

	it("should pass it's props", () => {
		render(
			<Button disabled type="submit" data-test="data test">
				Test
			</Button>
		);
		const button = screen.getByText("Test");
		expect(button).toBeDisabled();
		expect(button).toHaveAttribute("type", "submit");
		expect(button).toHaveAttribute("data-test", "data test");
	});

	it("should have default style when color, size, rounded, and fullWidth prop are not specified", () => {
		render(<Button>Test Default</Button>);
		const button = screen.getByText("Test Default");
		expect(button).toHaveClass("btnTransparent");
		expect(button).toHaveClass("btnNormal");
		expect(button).toHaveClass("rounded");
		expect(button).not.toHaveClass("btnFull");
	});

	it("should render correctly according to color prop", () => {
		render(<Button color="transparent">Test Transparent</Button>);
		expect(screen.getByText("Test Transparent")).toHaveClass(
			"btnTransparent"
		);

		render(<Button color="primary">Test Primary</Button>);
		expect(screen.getByText("Test Primary")).toHaveClass("btnPrimary");

		render(<Button color="secondary">Test Secondary</Button>);
		expect(screen.getByText("Test Secondary")).toHaveClass("btnSecondary");
	});

	it("should render correctly according to size prop", () => {
		render(<Button size="normal">Test Normal</Button>);
		expect(screen.getByText("Test Normal")).toHaveClass("btnNormal");

		render(<Button size="small">Test Small</Button>);
		expect(screen.getByText("Test Small")).toHaveClass("btnSmall");
	});

	it("should render rounded edge if it have rounded prop", () => {
		render(<Button rounded>Test Rounded</Button>);
		expect(screen.getByText("Test Rounded")).toHaveClass("rounded-full");
	});

	it("should render full width if it have fullWidth prop", () => {
		render(<Button fullWidth>Test Full</Button>);
		expect(screen.getByText("Test Full")).toHaveClass("btnFull");
	});
});
