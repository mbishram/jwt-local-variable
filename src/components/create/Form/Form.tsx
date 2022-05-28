import { FormikBuilder } from "@/components/ui/FormikBuilder/FormikBuilder";
import { FormikHandleSubmit } from "@/types/forms/formik-handle-submit";
import { HTMLProps, ReactNode, useEffect, useState } from "react";
import { CREATE_INPUT_ATTR, CreateQuoteFormType } from "@/forms/create";
import { randomBg } from "@/libs/random-bg";
import { createQuote } from "@/libs/fetchers/quotes";

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
	const [timer, setTimer] = useState(setTimeout(() => {}));
	const initialValues = {
		name: "",
		quote: "",
		bgColor: randomBg(),
	};

	const handleSubmit: FormikHandleSubmit<CreateQuoteFormType> = async (
		values,
		{ setStatus, setFieldValue }
	) => {
		try {
			// TODO: Change ObjectId to user's
			const res = await createQuote({
				...values,
				userId: "61f9147cba2fd619cdcddce1",
			});
			const data = res.data;
			setStatus(data);

			// Clean Input
			Object.keys(values).forEach((value) => {
				if (value === "bgColor") setFieldValue(value, randomBg());
				else setFieldValue(value, "");
			});
		} catch (error: any) {
			setStatus(error?.response?.data);
		} finally {
			// Close alert
			setTimer(setTimeout(() => setStatus(), 4000));
		}
	};

	useEffect(() => {
		return () => {
			clearTimeout(timer);
		};
	});

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
