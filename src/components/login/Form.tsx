import { FormikBuilder } from "@/components/ui/FormikBuilder/FormikBuilder";
import { LOGIN_INPUT_ATTR } from "@/forms/login";
import { FormikHandleSubmit } from "@/types/forms/formik-handle-submit";

export function LoginForm() {
	const initialValues = {
		username: "",
		password: "",
	};

	const handleSubmit: FormikHandleSubmit<typeof initialValues> = (values) => {
		console.log(values);
	};

	return (
		<FormikBuilder
			inputAttr={LOGIN_INPUT_ATTR}
			initialValues={initialValues}
			onSubmit={handleSubmit}
		/>
	);
}
