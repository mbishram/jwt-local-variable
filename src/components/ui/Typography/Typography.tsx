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
}: HTMLProps<HTMLParagraphElement & HTMLHeadingElement> & Props) {
	const classes = (defaultStyle?: string) => clsx(defaultStyle, className);

	switch (variant) {
		case "header":
			return (
				<h1 className={classes(styles.header)} {...props}>
					{children}
				</h1>
			);
		case "body2":
			return (
				<h1 className={classes(styles.body2)} {...props}>
					{children}
				</h1>
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
