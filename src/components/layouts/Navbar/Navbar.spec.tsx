/**
 * @jest-environment jsdom
 */

import React from "react";
import { itPassProps } from "@specs-utils/it-pass-props";
import { Navbar } from "@/components/layouts/Navbar/Navbar";
import { render, screen, waitFor } from "@testing-library/react";
import { useUser } from "@/hooks/use-user";
import {
	getAccessToken,
	getRefreshToken,
	setAccessToken,
	setRefreshToken,
} from "@/libs/token/local-storage-handler";
import Router from "next/router";
import userEvent from "@testing-library/user-event";
import { spyOnUseUser } from "@specs-utils/spy-on-useuser";

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
			spyOnUseUser({
				success: false,
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
		beforeEach(() => {
			spyOnUseUser({
				success: true,
				data: [{ name: "Muhammad Bishram Yashir Alfarizi Aminuddin" }],
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
		it("should be able to logout, redirect, and mutateUser", async () => {
			const accessTokenString = "AccessToken";
			const refreshTokenString = "RefreshToken";
			setAccessToken(accessTokenString);
			setRefreshToken(refreshTokenString);

			expect(getAccessToken()).toEqual(accessTokenString);
			expect(getRefreshToken()).toEqual(refreshTokenString);
			expect(Router).toMatchObject({ asPath: "/initial" });

			const logoutButton = screen.getByText("Logout");
			userEvent.click(logoutButton);

			await waitFor(() => {
				expect(getAccessToken()).toBeFalsy();
				expect(getRefreshToken()).toBeFalsy();
				expect(useUser().mutateUser).toBeCalledTimes(1);
				expect(Router).toMatchObject({ asPath: "/login" });
			});
		});
	});
});
