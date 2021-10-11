import { Formik, FormikConfig, FormikProps, FormikValues } from "formik";
import { InputAttr } from "@/types/forms/input-attr";
import { InputProps } from "@/types/components/input-props";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { Typography } from "@/components/ui/Typography/Typography";
import { HTMLProps } from "react";

/**
 * Component to automatically build forms from initialValues.
 * @param inputAttr
 * @param className
 * @param props
 * @constructor
 */
export function FormikBuilder<T>({
	inputAttr,
	className,
	...props
}: Props & FormikConfig<T> & Pick<HTMLProps<HTMLFormElement>, "className">) {
	return (
		<Formik {...props}>
			{({
				initialValues,
				handleSubmit,
				handleChange,
				isSubmitting,
				values,
			}: FormikProps<T> & { values: FormikValues }) => (
				<form onSubmit={handleSubmit} className={className} role="form">
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
							fullWidth: true,
						};

						return (
							<div key={`input-key-${index}`} className="mb-4">
								<Typography
									variant="label"
									htmlFor={key}
									className="mb-2"
								>
									{label}
								</Typography>
								<Input type={type} {...sharedProps} />
							</div>
						);
					})}

					<Button
						className="mt-6"
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
