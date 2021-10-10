import { HTMLAttributes } from "react";

export function Input(props: HTMLAttributes<HTMLInputElement>) {
	return <input type="text" {...props} />;
}
