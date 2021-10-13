import { Formik, FormikConfig, FormikProps, FormikValues } from "formik";
import { InputAttr } from "@/types/forms/input-attr";
import { InputProps } from "@/types/components/input-props";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { Typography } from "@/components/ui/Typography/Typography";
import { HTMLProps, ReactNode } from "react";

/**
 * Component to automatically build forms from initialValues.
 * @param inputAttr
 * @param className
 * @param beforeForm Put component before form
 * @param props
 * @constructor
 */
export function FormikBuilder<T>({
	inputAttr,
	className,
	beforeForm,
	...props
}: Props & FormikConfig<T> & Pick<HTMLProps<HTMLFormElement>, "className">) {
	return (
		<Formik {...props}>
			{({
				handleSubmit,
				handleChange,
				isSubmitting,
				values,
			}: FormikProps<T> & { values: FormikValues }) => (
				<form onSubmit={handleSubmit} className={className} role="form">
					{beforeForm && beforeForm}
					{Object.keys(inputAttr).map((key, index) => {
						const { label, type } = inputAttr[key];

						/**
						 * Properties shared between input type.
						 */
						const sharedProps: InputProps = {
							value: values[key],
							id: key,
							name: key,
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
								<Input
									type={type}
									placeholder={label}
									{...sharedProps}
								/>
							</div>
						);
					})}

					<Button
						className="mt-8"
						role="button"
						color="primary"
						type="submit"
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
	beforeForm?: ReactNode;
}
