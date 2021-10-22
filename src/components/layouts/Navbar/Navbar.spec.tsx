/**
 * @jest-environment jsdom
 */

import React from "react";
import { itPassProps } from "@specs-utils/it-pass-props";
import { Navbar } from "@/components/layouts/Navbar/Navbar";
import { render, screen } from "@testing-library/react";

describe("Navbar", () => {
	beforeEach(() => {
		render(<Navbar />);
	});

	itPassProps(Navbar);

	it("should render logo", () => {
		expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
	});

	it("should render links", () => {
		expect(screen.queryAllByRole("link").length).toBe(3);
	});
});
