import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";
import { Color } from "@/types/color";
import { Size } from "@/types/size";

/**
 * Button components to replace button html tag.
 * @param children
 * @param color Default to "transparent"
 * @param size Default to "normal"
 * @param rounded
 * @param fullWidth
 * @param props
 * @constructor
 */
export function Button({
	children,
	color = "transparent",
	size = "normal",
	rounded = false,
	fullWidth = false,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Props) {
	const colorStyle = (color: Color) => {
		switch (color) {
			case "primary":
				return styles.btnPrimary;
			case "secondary":
				return styles.btnSecondary;
			default:
				return styles.btnTransparent;
		}
	};

	const colorSize = (size: Size) => {
		switch (size) {
			case "small":
				return styles.btnSmall;
			default:
				return styles.btnNormal;
		}
	};

	return (
		<button
			{...props}
			className={clsx(
				styles.btn,
				colorStyle(color),
				colorSize(size),
				rounded ? "rounded-full" : "rounded",
				fullWidth && styles.btnFull
			)}
		>
			{children}
		</button>
	);
}

type Props = {
	color?: Color;
	size?: Size;
	rounded?: boolean;
	fullWidth?: boolean;
};
