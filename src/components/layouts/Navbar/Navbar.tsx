import { HTMLProps } from "react";
import { NavbarLink } from "@/components/layouts/NavbarLink/NavbarLink";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

export function Navbar(props: HTMLProps<HTMLElement>) {
	const { user } = useUser();

	return (
		<nav {...props} className="py-6 flex justify-between items-center">
			<Link href="/">
				<a>
					<h1 className="text-2xl font-bold">quote.me</h1>
				</a>
			</Link>
			<div className="flex gap-6">
				<NavbarLink href="/create">Create</NavbarLink>
				{user?.success ? (
					<>
						<NavbarLink
							href=""
							onClick={(e) => {
								e.preventDefault();
							}}
						>
							Logout
						</NavbarLink>
						<p className="max-w-xs truncate">
							{user?.data?.[0]?.name}
						</p>
					</>
				) : (
					<NavbarLink href="/login">Login</NavbarLink>
				)}
			</div>
		</nav>
	);
}
