/**
 * @jest-environment jsdom
 */

import React from "react";
import { Quote } from "@/components/ui/Quote/Quote";
import { QuoteClass } from "@/classes/quote-class";
import { itPassProps } from "@specs-utils/it-pass-props";
import { render, screen } from "@testing-library/react";

describe("Quote", () => {
	describe("when data is null", () => {
		beforeEach(() => {
			render(<Quote />);
		});

		itPassProps(Quote);

		it("should show indicator that data is empty", () => {
			expect(screen.getByText("- Anonymous")).toBeInTheDocument();
			expect(screen.getByText("Quote kosong!")).toBeInTheDocument();
		});
	});

	describe("when data is filled", () => {
		beforeEach(() => {
			render(
				<Quote
					data={
						new QuoteClass({
							name: "Nama Pengguna",
							quote: "Lorem ipsum dolor sit amet",
							bgColor: "",
						})
					}
				/>
			);
		});

		it("should render element using it's data", () => {
			expect(screen.getByText("- Nama Pengguna")).toBeInTheDocument();
			expect(
				screen.getByText("Lorem ipsum dolor sit amet")
			).toBeInTheDocument();
		});
	});
});
