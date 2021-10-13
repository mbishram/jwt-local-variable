import { HTMLProps } from "react";
import clsx from "clsx";
import style from "./TextArea.module.css";

export function TextArea({
	fullWidth,
	...props
}: HTMLProps<HTMLTextAreaElement> & Props) {
	return (
		<textarea
			className={clsx(style.input, fullWidth && style.fullWidth)}
			{...props}
		/>
	);
}

type Props = {
	fullWidth?: boolean;
};
