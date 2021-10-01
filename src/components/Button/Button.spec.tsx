import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/Button/Button";

describe("Test", () => {
	it("is working", () => {
		render(<Button>Test</Button>);

		const heading = screen.getByText("Test");

		expect(heading).toBeInTheDocument();
	});
});
