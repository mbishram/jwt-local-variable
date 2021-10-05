import { render, screen } from "@testing-library/react";
import React from "react";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";

describe("Main Layout", () => {
	beforeEach(() => {
		render(
			<MainLayout data-testid="main-layout" data-test="test data">
				<div data-testid="children">Test Children</div>
			</MainLayout>
		);
	});

	it("should pass it's props", () => {
		expect(screen.getByTestId("main-layout")).toHaveAttribute(
			"data-test",
			"test data"
		);
	});

	it("should have nav element", () => {
		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});

	it("should have main element", () => {
		expect(screen.getByRole("main")).toBeInTheDocument();
	});

	it("should have footer element", () => {
		expect(screen.getByRole("contentinfo")).toBeInTheDocument();
	});

	it("should pass it's children to main element", () => {
		const children = screen.getByTestId("children");
		expect(screen.getByRole("main")).toContainElement(children);
	});
});
