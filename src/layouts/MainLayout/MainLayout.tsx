import { ReactNode } from "react";
import { Button } from "@/components/Button/Button";

export default function MainLayout({ children }: Props) {
	return (
		<div className="flex flex-col h-screen">
			<Button>Tset</Button>
			<main className="flex-grow">{children}</main>
			<footer>Test Footer</footer>
		</div>
	);
}

type Props = {
	children: ReactNode;
};
