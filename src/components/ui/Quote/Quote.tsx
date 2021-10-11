import { HTMLProps } from "react";
import { QuoteModel } from "@/model/quote-model";
import styles from "./Quote.module.css";

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
		<article className={styles.article} {...props}>
			<p className={styles.quote}>{data?.quote || "Quote kosong!"}</p>
			<p className={styles.name}>- {data?.name || "Anonymous"}</p>
		</article>
	);
}

type Props = {
	data?: QuoteModel;
};
