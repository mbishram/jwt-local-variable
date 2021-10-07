import { HTMLAttributes } from "react";
import { TextVariant } from "@/types/text-variant";
import style from "./Typograpy.module.css";

/**
 * Component to create text.
 * @param children
 * @param variant Default to body1
 * @param props
 * @constructor
 */
export function Typography({
	children,
	variant = "body1",
	...props
}: HTMLAttributes<HTMLParagraphElement & HTMLHeadingElement> & Props) {
	switch (variant) {
		case "header":
			return (
				<h1 className={style.header} {...props}>
					{children}
				</h1>
			);
		default:
			return <p {...props}>{children}</p>;
	}
}

type Props = {
	variant?: TextVariant;
};
