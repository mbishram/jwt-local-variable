import Link, { LinkProps } from "next/link";
import { HTMLProps } from "react";
import clsx from "clsx";

export function NavbarLink({
	children,
	href = "/",
	className,
	...props
}: LinkProps & HTMLProps<HTMLAnchorElement>) {
	return (
		<Link href={href}>
			<a
				{...props}
				className={clsx(
					className,
					"no-underline hover:underline font-medium"
				)}
			>
				{children}
			</a>
		</Link>
	);
}
