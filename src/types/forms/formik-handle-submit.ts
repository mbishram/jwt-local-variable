import { FormikHelpers } from "formik/dist/types";

export type FormikHandleSubmit<Values> = (
	values: Values,
	formikHelpers: FormikHelpers<Values>
) => void | Promise<any>;
