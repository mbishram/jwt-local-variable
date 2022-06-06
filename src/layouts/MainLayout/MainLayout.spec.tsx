/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { itPassProps } from "@specs-utils/it-pass-props";

describe("Main Layout", () => {
	describe("when disableNav is not set", () => {
		beforeEach(() => {
			render(
				<MainLayout data-testid="main-layout" data-test="test data">
					<div data-testid="children">Test Children</div>
				</MainLayout>
			);
		});

		itPassProps(MainLayout);

		it("should have Container component as it's parent element", () => {
			expect(screen.getByTestId("main-layout")).toHaveClass("wrapper");
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

	describe("when disableNav is set", () => {
		beforeEach(() => {
			render(<MainLayout disableNav>Test Children</MainLayout>);
		});

		it("should not render create button", () => {
			expect(screen.queryByText("navigation")).not.toBeInTheDocument();
		});
	});
});
