import Router from "next/router";
import { RouterContext } from "next/dist/shared/lib/router-context";
import React, { ReactNode } from "react";

/**
 * Function to mock next router.
 * @param Page
 */
export const mockRouter = (Page: ReactNode) => {
	/**
	 * Mocked properties and methods
	 */
	Router.replace = jest.fn();

	return (
		<RouterContext.Provider value={Router}>{Page}</RouterContext.Provider>
	);
};
