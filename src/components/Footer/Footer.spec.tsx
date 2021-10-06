import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer/Footer";

describe("Footer", () => {
	it("should have default text and styling when they are not specified", () => {
		render(<Footer />);
		const footer = screen.getByText(
			`\u00A9 ${new Date().getFullYear()} ${
				process.env.NEXT_PUBLIC_APPLICATION_NAME
			}`
		);
		expect(footer).toBeInTheDocument();
		expect(footer).toHaveClass("text-center py-3 text-gray-400 font-light");
	});

	it("should override it's children if specified", () => {
		render(<Footer>Test Children</Footer>);
		expect(screen.getByText("Test Children")).toBeInTheDocument();

		render(
			<Footer>
				<div data-testid="button-child">Test Children</div>
			</Footer>
		);
		expect(screen.getByTestId("button-child")).toBeInTheDocument();
	});

	it("should override it's classes if specified", () => {
		render(<Footer className="bg-black">Test</Footer>);
		const footer = screen.getByText("Test");
		expect(footer).not.toHaveClass(
			"text-center py-3 text-gray-400 font-light"
		);
		expect(footer).toHaveClass("bg-black");
	});

	it("should pass it's props", () => {
		render(
			<Footer aria-labelledby="labeltest" data-test="test data">
				Test
			</Footer>
		);
		const footer = screen.getByText("Test");
		expect(footer).toHaveAttribute("aria-labelledby", "labeltest");
		expect(footer).toHaveAttribute("data-test", "test data");
	});
});
