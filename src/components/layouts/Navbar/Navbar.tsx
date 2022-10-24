import { HTMLProps, MouseEvent } from "react";
import { NavbarLink } from "@/components/layouts/NavbarLink/NavbarLink";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/router";
import {
	removeAccessToken,
	removeCSRFToken,
} from "@/libs/token/variable-handler";
import { logout } from "@/libs/fetchers/auth";

export function Navbar(props: HTMLProps<HTMLElement>) {
	const { user, mutateUser } = useUser();
	const router = useRouter();

	const handleLogoutClick = async (e: MouseEvent) => {
		e.preventDefault();
		try {
			await logout();
		} catch (e) {
		} finally {
			removeCSRFToken();
			removeAccessToken();

			await mutateUser({ success: false });
			await router.replace("/login");
		}
	};

	return (
		<nav {...props} className="py-6 flex justify-between items-center">
			<Link href="/">
				<a className="no-underline">
					<h1 className="text-2xl font-bold">quote.me</h1>
				</a>
			</Link>
			<div className="flex gap-6">
				<NavbarLink href="/create">Create</NavbarLink>
				{user?.success ? (
					<>
						<NavbarLink href="" onClick={handleLogoutClick}>
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
