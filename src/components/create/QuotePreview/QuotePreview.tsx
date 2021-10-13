import { Quote } from "@/components/ui/Quote/Quote";
import { QuoteModel } from "@/model/quote-model";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

/**
 * To get data from Formik form.
 * @constructor
 * @extends Quote
 */
export function QuotePreview() {
	/**
	 * If I didn't use useState, the color is wrong.
	 * I do not understand why.
	 */
	const [{ quote, name, bgColor }, setQuoteData] = useState(
		new QuoteModel({ quote: "", bgColor: "", name: "" })
	);
	const { values }: { values: QuoteModel } = useFormikContext();

	useEffect(() => {
		setQuoteData(values);
	}, [values]);

	return (
		<Quote
			data={
				new QuoteModel({
					quote,
					name,
					bgColor,
				})
			}
		/>
	);
}
