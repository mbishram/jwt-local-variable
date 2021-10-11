import { HTMLProps, ReactNode } from "react";
import clsx from "clsx";

/**
 * Footer component with a default text and styling.
 * @param children
 * @param className Replace default styling.
 * @param props
 * @constructor
 */
export function Footer({
	children,
	className,
	...props
}: HTMLProps<HTMLElement> & Props) {
	return (
		<footer
			className={clsx(
				className || "text-center py-3 text-gray-400 font-light"
			)}
			{...props}
		>
			{children ||
				`\u00A9 ${new Date().getFullYear()} ${
					process.env.NEXT_PUBLIC_APPLICATION_NAME
				}`}
		</footer>
	);
}

type Props = {
	children?: ReactNode;
};
