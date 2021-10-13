import { HTMLProps } from "react";
import { NavbarLink } from "@/components/layouts/NavbarLink/NavbarLink";
import Link from "next/link";

export function Navbar(props: HTMLProps<HTMLElement>) {
	return (
		<nav {...props} className="py-6 flex justify-between items-center">
			<Link href="/">
				<a>
					<h1 className="text-2xl font-bold">quote.me</h1>
				</a>
			</Link>
			<div className="flex gap-6">
				<NavbarLink href="/create">Create</NavbarLink>
				<NavbarLink href="/login">Login</NavbarLink>
			</div>
		</nav>
	);
}
