import { AlertType } from "@/types/components/alert-type";

export type AlertDataType = {
	isOpen: boolean;
	type?: AlertType;
	message?: string;
};
