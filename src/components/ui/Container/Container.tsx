import { HTMLAttributes } from "react";
import clsx from "clsx";
import style from "./Container.module.css";

/**
 * Responsive container component.
 * @param children
 * @param className Add default styling.
 * @param props
 * @constructor
 */
export function Container({
	children,
	className,
	...props
}: HTMLAttributes<HTMLElement>) {
	return (
		<div className={clsx(style.wrapper, className)} {...props}>
			{children}
		</div>
	);
}
