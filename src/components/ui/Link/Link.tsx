import NextLink, { LinkProps } from "next/link";
import { HTMLProps } from "react";

/**
 * Extension of Next Link
 * @param children
 * @param href
 * @param props
 * @constructor
 * @extends NextLink
 */
export function Link({
	children,
	href,
	...props
}: LinkProps & HTMLProps<HTMLAnchorElement>) {
	return (
		<NextLink href={href}>
			<a className="underline hover:text-primary-500" {...props}>
				{children}
			</a>
		</NextLink>
	);
}
