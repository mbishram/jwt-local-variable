/**
 * @jest-environment jsdom
 */

import React from "react";
import { useFormikContext } from "formik";
import { QuotePreview } from "@/components/create/QuotePreview/QuotePreview";
import { render } from "@testing-library/react";

jest.mock("formik", () => {
	return {
		useFormikContext: jest.fn(() => ({
			values: "",
		})),
	};
});

describe("QuotePreview", () => {
	it("should call useFormikContext", () => {
		render(<QuotePreview />);
		expect(useFormikContext).toHaveBeenCalled();
	});
});
