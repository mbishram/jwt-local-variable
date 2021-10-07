import Router from "next/router";
import { RouterContext } from "next/dist/shared/lib/router-context";
import React, { ReactElement } from "react";

/**
 * Function to mock next router.
 * @param Page
 */
export const mockRouter = (Page: ReactElement) => {
	/**
	 * Mocked properties and methods
	 */
	Router.replace = jest.fn();

	return (
		<RouterContext.Provider value={Router}>{Page}</RouterContext.Provider>
	);
};
