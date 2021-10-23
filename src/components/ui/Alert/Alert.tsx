import { ReactNode } from "react";
import clsx from "clsx";
import { AlertType } from "@/types/components/alert-type";
import styles from "./Alert.module.css";

export const Alert = ({ children, type, disableFixed = false }: Props) => {
	const typeStyle = (type?: AlertType) => {
		switch (type) {
			case "danger":
				return styles.danger;
			case "warning":
				return styles.warning;
			case "success":
				return styles.success;
			default:
				return styles.default;
		}
	};

	return (
		<div
			role="alert"
			className={clsx(
				!disableFixed && styles.alertFixed,
				styles.alert,
				typeStyle(type)
			)}
		>
			{children}
		</div>
	);
};

interface Props {
	children: ReactNode;
	type?: AlertType;
	disableFixed?: boolean;
}
