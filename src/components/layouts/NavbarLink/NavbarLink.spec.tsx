/**
 * @jest-environment jsdom
 */

import React from "react";
import { itPassProps } from "@specs-utils/it-pass-props";
import { NavbarLink } from "@/components/layouts/NavbarLink/NavbarLink";
import { itPassChildren } from "@specs-utils/it-pass-children";
import { render, screen } from "@testing-library/react";

describe("NavbarLink", () => {
	itPassProps(NavbarLink);

	itPassChildren(NavbarLink);

	it("should pass className prop", () => {
		render(
			<NavbarLink href="/" className="bg-black">
				Test
			</NavbarLink>
		);
		expect(screen.getByText("Test")).toHaveClass("bg-black");
	});

	it("should pass href prop", () => {
		render(
			<NavbarLink href="/" className="bg-black">
				Test
			</NavbarLink>
		);
		expect(screen.getByText("Test")).toHaveAttribute("href", "/");
	});
});
