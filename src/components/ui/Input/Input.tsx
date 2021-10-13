import { InputProps } from "@/types/components/input-props";
import clsx from "clsx";
import styles from "./Input.module.css";

export function Input({ fullWidth, ...props }: InputProps) {
	return (
		<input
			className={clsx(styles.input, fullWidth && styles.fullWidth)}
			type="text"
			{...props}
		/>
	);
}
