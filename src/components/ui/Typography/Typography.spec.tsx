/**
 * @jest-environment jsdom
 */

import React from "react";
import { Typography } from "@/components/ui/Typography/Typography";
import { itPassChildren } from "@specs-utils/it-pass-children";
import { render, screen } from "@testing-library/react";

describe("Typography", () => {
	itPassChildren(Typography);

	it("should render header when variant prop equal header", () => {
		render(<Typography variant="header">Test</Typography>);
		expect(screen.getByText("Test")).toHaveClass("header");
	});

	it("should render body1 when variant prop equal body1", () => {
		render(<Typography variant="body1">Test</Typography>);
		expect(screen.getByText("Test")).not.toHaveClass();

		render(<Typography>Test 2</Typography>);
		expect(screen.getByText("Test 2")).not.toHaveClass();
	});

	it("should render body2 when variant prop equal body2", () => {
		render(<Typography variant="body2">Test</Typography>);
		expect(screen.getByText("Test")).toHaveClass("body2");
	});

	it("should render label when variant prop equal label", () => {
		render(<Typography variant="label">Test</Typography>);
		expect(screen.getByText("Test")).toHaveClass("label");
	});

	it("should className props and doesn't overwrite default style", () => {
		render(
			<Typography variant="body2" className="text-blue-50">
				Test
			</Typography>
		);
		expect(screen.getByText("Test")).toHaveClass("body2 text-blue-50");
	});
});
