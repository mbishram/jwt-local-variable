import { HTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/Button/Button";
import { Footer } from "@/components/Footer/Footer";
import { Container } from "@/components/Container/Container";
import clsx from "clsx";

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
}: HTMLAttributes<HTMLDivElement> & Props) {
	return (
		<Container
			className={clsx(className, "flex flex-col h-screen")}
			{...props}
		>
			{!disableNav && (
				<nav className="py-4 flex justify-between items-center">
					<p className="text-lg text-gray-400 font-light">
						You are{" "}
						<b className="text-black font-bold">Logged in</b>
					</p>
					<Button color="primary">Logout</Button>
				</nav>
			)}
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
