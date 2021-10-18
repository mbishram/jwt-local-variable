import { Quote } from "@/components/ui/Quote/Quote";
import { QuoteClass } from "@/classes/quote-class";
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
	const [quoteData, setQuoteData] = useState(
		new QuoteClass({ quote: "", bgColor: "", name: "" })
	);
	const { values }: { values: QuoteClass } = useFormikContext();

	useEffect(() => {
		setQuoteData(values);
	}, [values]);

	return <Quote data={quoteData} />;
}
