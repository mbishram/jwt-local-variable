import { Quote } from "@/components/ui/Quote/Quote";
import { QuoteModel } from "@/models/quote-model";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";

/**
 * To get data from Formik form.
 * @constructor
 * @extends QuoteModel
 */
export function QuotePreview() {
	const { user } = useUser();
	/**
	 * If I didn't use useState, the color is wrong.
	 * I do not understand why.
	 */
	const [quoteData, setQuoteData] = useState(
		new QuoteModel({
			quote: "",
			bgColor: "",
			name: "",
			username: "",
		})
	);
	const { values }: { values: QuoteModel } = useFormikContext();

	useEffect(() => {
		setQuoteData({ ...values, username: user?.data?.[0]?.name });
	}, [values, user]);
	return <Quote data={quoteData} />;
}
