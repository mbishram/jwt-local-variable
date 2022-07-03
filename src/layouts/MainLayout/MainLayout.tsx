import { HTMLProps, ReactNode } from "react";
import { Footer } from "@/components/ui/Footer/Footer";
import { Container } from "@/components/ui/Container/Container";
import clsx from "clsx";
import { Navbar } from "@/components/layouts/Navbar/Navbar";
import { useSetCookie } from "@/hooks/use-set-cookie";

/**
 * Main Layout.
 * @param children Children are passed to main.
 * @param className
 * @param classMain Classes are passed to main.
 * @param disableNav
 * @param props
 * @constructor
 */
export function MainLayout({
	children,
	className,
	classMain,
	disableNav,
	...props
}: HTMLProps<HTMLDivElement> & Props) {
	useSetCookie();

	return (
		<Container
			className={clsx(className, "flex flex-col h-screen")}
			{...props}
		>
			{!disableNav && <Navbar />}
			<main className={clsx(classMain, "flex-grow")}>{children}</main>
			<Footer />
		</Container>
	);
}

type Props = {
	children: ReactNode;
	disableNav?: boolean;
	classMain?: string;
};
