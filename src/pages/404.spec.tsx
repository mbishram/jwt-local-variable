import React from "react";
import { render } from "@testing-library/react";
import Custom404 from "@/pages/404";
import Router from "next/router";
import { mockRouter } from "@specs-utils/mock-router";

describe("404 Page", () => {
	it("should redirect to home page", () => {
		render(mockRouter(<Custom404 />));
		expect(Router.replace).toHaveBeenCalledWith("/");
	});
});
