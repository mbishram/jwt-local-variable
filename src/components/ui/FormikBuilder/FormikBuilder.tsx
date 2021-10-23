import { Formik, FormikConfig, FormikProps, FormikValues } from "formik";
import { InputAttr } from "@/types/forms/input-attr";
import { InputProps, TextAreaProps } from "@/types/components/input-props";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { Typography } from "@/components/ui/Typography/Typography";
import { HTMLProps, ReactNode } from "react";
import { INPUT_TYPES } from "@/constants/input-types";
import { TextArea } from "@/components/ui/TextArea/TextArea";
import { NextJson } from "@/classes/next-json";
import { Alert } from "@/components/ui/Alert/Alert";

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
				status,
			}: FormikProps<T> & {
				values: FormikValues;
				status: NextJson<T>;
			}) => (
				<form onSubmit={handleSubmit} className={className} role="form">
					{status &&
						(status?.success ? (
							<Alert type="success">{status.message}</Alert>
						) : (
							<Alert type="danger">{status.message}</Alert>
						))}

					{beforeForm && beforeForm}
					{Object.keys(inputAttr).map((key, index) => {
						const { label, type } = inputAttr[key];

						/**
						 * Properties shared between input type.
						 */
						const sharedProps: InputProps & TextAreaProps = {
							value: values[key],
							id: key,
							name: key,
							onChange: handleChange,
							placeholder: label,
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
								{type === INPUT_TYPES.TEXTAREA ? (
									<TextArea rows={5} {...sharedProps} />
								) : (
									<Input type={type} {...sharedProps} />
								)}
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
