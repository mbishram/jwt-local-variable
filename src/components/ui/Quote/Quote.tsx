import { HTMLProps } from "react";
import { QuoteClass } from "@/classes/quote-class";
import styles from "./Quote.module.css";
import clsx from "clsx";

/**
 * Component to showcase a quote.
 * @param props
 * @param data {QuoteClass}
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
	data?: QuoteClass;
};
