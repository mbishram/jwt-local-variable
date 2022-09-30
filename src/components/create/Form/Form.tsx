import { FormikBuilder } from "@/components/ui/FormikBuilder/FormikBuilder";
import { FormikHandleSubmit } from "@/types/forms/formik-handle-submit";
import { HTMLProps, ReactNode, useEffect, useState } from "react";
import { CREATE_INPUT_ATTR, CreateQuoteFormType } from "@/forms/create";
import { randomBg } from "@/libs/random-bg";
import { createQuote } from "@/libs/fetchers/quotes";
import { useRouter } from "next/router";

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
	const { query } = useRouter();
	const [timer, setTimer] = useState(setTimeout(() => {}));
	const [initialValues, setInitialValues] = useState({
		name: "",
		quote: "",
		bgColor: randomBg(),
	});

	useEffect(() => {
		const { name, quote } = query;
		if (name || quote) {
			setInitialValues({
				...initialValues,
				name: decodeURI((name as string) || ""),
				quote: decodeURI((quote as string) || ""),
			});
		}
	}, [query]);

	const handleSubmit: FormikHandleSubmit<CreateQuoteFormType> = async (
		values,
		{ setStatus, setFieldValue }
	) => {
		try {
			const res = await createQuote({
				...values,
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
				enableReinitialize
			/>
		</>
	);
}

type Props = { beforeForm?: ReactNode };
