/**
 * @jest-environment jsdom
 */

import React from "react";
import { itPassProps } from "@specs-utils/it-pass-props";
import { Navbar } from "@/components/layouts/Navbar/Navbar";
import { render, screen } from "@testing-library/react";
import * as useUserHook from "@/hooks/use-user";
import { useUser } from "@/hooks/use-user";

describe("Navbar", () => {
	describe("on default state", () => {
		beforeEach(() => {
			render(<Navbar />);
		});

		itPassProps(Navbar);

		it("should render logo", () => {
			expect(
				screen.getByRole("heading", { level: 1 })
			).toBeInTheDocument();
		});

		it("should render create button", () => {
			expect(screen.getByText("Create")).toBeTruthy();
		});
	});

	describe("when not login", () => {
		beforeEach(() => {
			jest.spyOn(useUserHook, "useUser").mockReturnValue({
				user: {
					success: false,
				},
				mutateUser: jest.fn(),
			});
			render(<Navbar />);
		});

		it("should not render user name", () => {
			expect(screen.queryByText("Muhammad Bishram")).toBeFalsy();
		});
		it("should not render logout button", () => {
			expect(screen.queryByText("Logout")).toBeFalsy();
		});
		it("should render login button", () => {
			expect(screen.queryByText("Login")).toBeTruthy();
		});
	});

	describe("when login", () => {
		beforeEach(async () => {
			jest.spyOn(useUserHook, "useUser").mockReturnValue({
				user: {
					success: true,
					data: [
						{ name: "Muhammad Bishram Yashir Alfarizi Aminuddin" },
					],
				},
				mutateUser: jest.fn(),
			});
			render(<Navbar />);
		});

		it("should not render login button", () => {
			expect(screen.queryByText("Login")).toBeFalsy();
		});
		it("should render user name", () => {
			expect(
				screen.queryByText("Muhammad Bishram Yashir Alfarizi Aminuddin")
			).toBeTruthy();
		});
		it("should render logout button", () => {
			expect(screen.queryByText("Logout")).toBeTruthy();
		});
		it.todo("should be able to logout");
	});
});
