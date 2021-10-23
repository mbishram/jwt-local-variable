/**
 * @jest-environment jsdom
 */

import { Link } from "./Link";
import { itPassChildren } from "@specs-utils/it-pass-children";
import { itPassProps } from "@specs-utils/it-pass-props";
import { render, screen } from "@testing-library/react";

describe("Link", () => {
	itPassChildren(Link, { href: "/test" });

	itPassProps(Link, { href: "/test" });

	it("should pass href prop", () => {
		render(<Link href="/test">Test</Link>);
		expect(screen.getByText("Test")).toHaveAttribute("href", "/test");
	});
});
