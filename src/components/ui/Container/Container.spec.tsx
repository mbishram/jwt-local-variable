/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { Container } from "@/components/ui/Container/Container";
import { itPassChildren } from "@specs-utils/it-pass-children";
import { itPassProps } from "@specs-utils/it-pass-props";

describe("Main Layout", () => {
	beforeEach(() => {
		render(
			<Container
				className="bg-black"
				data-testid="container"
				data-test="test data"
			>
				<div data-testid="children">Test</div>
			</Container>
		);
	});

	itPassProps(Container);

	itPassChildren(Container);

	it("should pass it's class if className is specified and it doesn't remove default class", () => {
		const container = screen.getByTestId("container");
		expect(container).toHaveClass("wrapper");
		expect(container).toHaveClass("bg-black");
	});
});
