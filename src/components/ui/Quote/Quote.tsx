import { HTMLProps } from "react";
import { QuoteModel } from "@/models/quote-model";
import styles from "./Quote.module.css";
import clsx from "clsx";

/**
 * Component to showcase a quote.
 * @param props
 * @param data {QuoteModel}
 * @constructor
 */
export function Quote({
	data,
	...props
}: Omit<HTMLProps<HTMLElement>, "className" | "data"> & Props) {
	return (
		<article
			className={clsx(styles.article, data?.bgColor || "bg-gray-800")}
			{...props}
		>
			<p
				className={styles.quote}
				dangerouslySetInnerHTML={{
					__html: data?.quote || "Quote kosong!",
				}}
			/>
			<p className={styles.name}>- {data?.name || "Anonymous"}</p>
		</article>
	);
}

type Props = {
	data?: QuoteModel;
};
