import { screen } from "@testing-library/react";
import { FormikValues } from "formik";
import { InputAttr } from "@/types/forms/input-attr";

/**
 * Generate spec to test if form rendered with input and label.
 * @param data
 * @param name To overwrite default test name
 */
export const itRenderInput = (
	data: { initialValues: FormikValues; inputAttr: InputAttr },
	name?: string
) => {
	const { initialValues, inputAttr } = data;
	return it(name || "should render input and label properly", () => {
		const initialValuesKeys = Object.keys(initialValues);
		let inputCount = 0;
		initialValuesKeys.forEach((initialValue) => {
			const { label } = inputAttr[initialValue];

			const input = screen.getByLabelText(label);
			if (input) {
				expect(input).toBeInTheDocument();
				inputCount++;
			}
		});
		expect(inputCount).toBe(initialValuesKeys.length);
	});
};
