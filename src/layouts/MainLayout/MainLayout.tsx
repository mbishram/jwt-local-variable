import { HTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/Button/Button";
import { Footer } from "@/components/Footer/Footer";
import { Container } from "@/components/Container/Container";

/**
 * Main Layout.
 * @param children Children passed to main.
 * @param disableNav
 * @param props
 * @constructor
 */
export function MainLayout({
	children,
	disableNav,
	...props
}: HTMLAttributes<HTMLDivElement> & Props) {
	return (
		<Container className="flex flex-col h-screen" {...props}>
			{!disableNav && (
				<nav className="py-4 flex justify-between items-center">
					<p className="text-lg text-gray-400 font-light">
						You are{" "}
						<b className="text-black font-bold">Logged in</b>
					</p>
					<Button color="primary">Logout</Button>
				</nav>
			)}
			<main className="flex-grow">{children}</main>
			<Footer />
		</Container>
	);
}

type Props = {
	children: ReactNode;
	disableNav?: boolean;
};
