/**
 * @jest-environment jsdom
 */

import { itPassChildren } from "@specs-utils/it-pass-children";
import { Alert } from "@/components/ui/Alert/Alert";
import { render, screen } from "@testing-library/react";

describe("Alert", () => {
	itPassChildren(Alert);

	it("should able to render according to type prop", () => {
		render(<Alert>Default</Alert>);
		expect(screen.getByText("Default")).toHaveClass("default");

		render(<Alert type="danger">Danger</Alert>);
		expect(screen.getByText("Danger")).toHaveClass("danger");

		render(<Alert type="warning">Warning</Alert>);
		expect(screen.getByText("Warning")).toHaveClass("warning");

		render(<Alert type="success">Success</Alert>);
		expect(screen.getByText("Success")).toHaveClass("success");
	});

	it("should able to render according to disableFixed prop", () => {
		render(<Alert>Default</Alert>);
		expect(screen.getByText("Default")).toHaveClass("alertFixed");

		render(<Alert disableFixed>Disable Fixed</Alert>);
		expect(screen.getByText("Disable Fixed")).not.toHaveClass("alertFixed");
	});
});
