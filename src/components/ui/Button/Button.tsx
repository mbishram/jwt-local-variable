import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";
import { Color } from "@/types/components/color";
import { Size } from "@/types/components/size";

/**
 * Button components to replace button html tag.
 * @param children
 * @param color Default to "transparent"
 * @param size Default to "normal"
 * @param rounded
 * @param icon
 * @param fullWidth
 * @param fab
 * @param className
 * @param props
 * @constructor
 */
export function Button({
	children,
	color = "transparent",
	size = "normal",
	rounded = false,
	icon = false,
	fab = false,
	fullWidth = false,
	className,
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

	const sizeStyle = (size: Size) => {
		if (icon) {
			switch (size) {
				case "small":
					return styles.btnIconSmall;
				default:
					return styles.btnIconNormal;
			}
		} else {
			switch (size) {
				case "small":
					return styles.btnSmall;
				default:
					return styles.btnNormal;
			}
		}
	};

	return (
		<button
			{...props}
			className={clsx(
				styles.btn,
				colorStyle(color),
				sizeStyle(size),
				rounded ? "rounded-full" : "rounded",
				fullWidth && styles.btnFull,
				fab && styles.btnFAB,
				className
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
	icon?: boolean;
	fab?: boolean;
	fullWidth?: boolean;
};
