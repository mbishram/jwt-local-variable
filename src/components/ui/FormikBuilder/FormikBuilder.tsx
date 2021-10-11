import { Formik, FormikConfig, FormikProps, FormikValues } from "formik";
import { InputAttr } from "@/types/forms/input-attr";
import { InputProps } from "@/types/components/input-props";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";

/**
 * Component to automatically build forms from initialValues.
 * @param inputAttr
 * @param props
 * @constructor
 */
export function FormikBuilder<T>({
	inputAttr,
	...props
}: Props & FormikConfig<T>) {
	return (
		<Formik {...props}>
			{({
				initialValues,
				handleSubmit,
				handleChange,
				isSubmitting,
				values,
			}: FormikProps<T> & { values: FormikValues }) => (
				<form onSubmit={handleSubmit}>
					{Object.keys(initialValues).map((key, index) => {
						const { label, type } = inputAttr[key];

						/**
						 * Properties shared between input type.
						 */
						const sharedProps: InputProps = {
							value: values[key],
							id: key,
							name: key,
							label: label,
							onChange: handleChange,
						};

						return (
							<div key={`input-key-${index}`}>
								<label htmlFor={key}>{label}</label>
								<Input type={type} {...sharedProps} />
							</div>
						);
					})}

					<Button
						role="button"
						color="primary"
						type="submit"
						fullWidth
						disabled={isSubmitting}
					>
						Submit
					</Button>
				</form>
			)}
		</Formik>
	);
}

interface Props {
	inputAttr: InputAttr;
}
