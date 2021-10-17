import { FormikBuilder } from "@/components/ui/FormikBuilder/FormikBuilder";
import { FormikHandleSubmit } from "@/types/forms/formik-handle-submit";
import { HTMLProps, ReactNode } from "react";
import { CREATE_INPUT_ATTR } from "@/forms/create";
import { randomBg } from "@/libs/random-bg";

/**
 * To separate create quote logic
 * @param className
 * @param beforeForm Put component before form
 * @constructor
 */
export function CreateForm({
	className,
	beforeForm,
}: Pick<HTMLProps<HTMLFormElement>, "className"> & Props) {
	const initialValues = {
		name: "",
		quote: "",
		bgColor: randomBg(),
	};

	const handleSubmit: FormikHandleSubmit<typeof initialValues> = (values) => {
		console.log(values);
	};

	return (
		<>
			<FormikBuilder
				beforeForm={beforeForm}
				inputAttr={CREATE_INPUT_ATTR}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				className={className}
			/>
		</>
	);
}

type Props = { beforeForm?: ReactNode };
