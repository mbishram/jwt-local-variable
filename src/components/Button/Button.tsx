import { HTMLAttributes } from "react";

export function Button({ children }: HTMLAttributes<HTMLButtonElement>) {
	return <button>{children}</button>;
}
