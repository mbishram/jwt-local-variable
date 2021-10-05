import { HTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/Button/Button";
import { Footer } from "@/components/Footer/Footer";

/**
 * Main Layout.
 * @param children Children passed to main.
 * @param props
 * @constructor
 */
export function MainLayout({
	children,
	...props
}: HTMLAttributes<HTMLDivElement> & Props) {
	return (
		<div className="flex flex-col h-screen" {...props}>
			<nav>
				<Button color="primary">Tset</Button>
			</nav>
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
}

type Props = {
	children: ReactNode;
};
