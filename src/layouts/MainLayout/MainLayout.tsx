import { HTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/Button/Button";
import { Footer } from "@/components/Footer/Footer";
import { Container } from "@/components/Container/Container";

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
		<Container className="flex flex-col h-screen" {...props}>
			<nav>
				<Button color="primary">Tset</Button>
			</nav>
			<main className="flex-grow">{children}</main>
			<Footer />
		</Container>
	);
}

type Props = {
	children: ReactNode;
};
