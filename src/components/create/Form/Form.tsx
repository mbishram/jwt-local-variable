import { FormikBuilder } from "@/components/ui/FormikBuilder/FormikBuilder";
import { FormikHandleSubmit } from "@/types/forms/formik-handle-submit";
import { HTMLProps, ReactNode } from "react";
import { CREATE_INPUT_ATTR } from "@/forms/create";
import { randomBg } from "@/libs/random-bg";
import axios from "axios";
import { NextJson } from "@/classes/next-json";
import { QuoteClass } from "@/classes/quote-class";

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

	const handleSubmit: FormikHandleSubmit<typeof initialValues> = async (
		values
	) => {
		console.log(values);
		const res = await axios.post("/api/quotes", values);
		const { data } = res.data as NextJson<QuoteClass>;

		console.log(data);
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
