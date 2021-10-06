import { HTMLAttributes } from "react";
import clsx from "clsx";

export function Container({
	children,
	className,
	...props
}: HTMLAttributes<HTMLElement>) {
	return (
		<div className={clsx("container mx-auto px-4", className)} {...props}>
			{children}
		</div>
	);
}
