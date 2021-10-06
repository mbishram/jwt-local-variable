import React from "react";
import { render, screen } from "@testing-library/react";
import Custom404 from "@/pages/404.page";
import Router from "next/router";
import { mockRouter } from "@specs-utils/mock-router";
import Login from "@/pages/login.page";

describe("Pages", () => {
	describe("when it's not found", () => {
		it("should redirect to home page", () => {
			render(mockRouter(<Custom404 />));
			expect(Router.replace).toHaveBeenCalledWith("/");
		});
	});

	describe("when it's found", () => {
		it("should render page", () => {
			render(<Login />);
			expect(
				screen.getByText(
					`\u00A9 ${new Date().getFullYear()} ${
						process.env.NEXT_PUBLIC_APPLICATION_NAME
					}`
				)
			).toBeInTheDocument();
		});
	});
});
