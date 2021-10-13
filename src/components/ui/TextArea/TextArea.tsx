import clsx from "clsx";
import style from "./TextArea.module.css";
import { TextAreaProps } from "@/types/components/input-props";

export function TextArea({ fullWidth, ...props }: TextAreaProps) {
	return (
		<textarea
			role="textbox"
			className={clsx(style.input, fullWidth && style.fullWidth)}
			{...props}
		/>
	);
}
