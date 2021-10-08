import React from "react";
import { Typography } from "@/components/Typography/Typography";
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
});
