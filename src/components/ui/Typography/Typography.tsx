import { HTMLProps } from "react";
import { TextVariant } from "@/types/components/text-variant";
import styles from "./Typograpy.module.css";
import clsx from "clsx";

/**
 * Component to create text.
 * @param children
 * @param variant Default to body1
 * @param className
 * @param props
 * @constructor
 */
export function Typography({
	children,
	variant = "body1",
	className,
	...props
}: HTMLProps<HTMLParagraphElement & HTMLHeadingElement & HTMLLabelElement> &
	Props) {
	const classes = (defaultStyle?: string) => clsx(defaultStyle, className);

	switch (variant) {
		case "header":
			return (
				<h2 className={classes(styles.header)} {...props}>
					{children}
				</h2>
			);
		case "body2":
			return (
				<p className={classes(styles.body2)} {...props}>
					{children}
				</p>
			);
		case "label":
			return (
				<label className={classes(styles.label)} {...props}>
					{children}
				</label>
			);
		default:
			return (
				<p className={classes()} {...props}>
					{children}
				</p>
			);
	}
}

type Props = {
	variant?: TextVariant;
};
