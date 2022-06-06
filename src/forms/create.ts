import { INPUT_TYPES } from "@/constants/input-types";
import { InputAttr } from "@/types/forms/input-attr";

/**
 * To generate create's form input.
 */
export const CREATE_INPUT_ATTR: InputAttr = {
	name: { label: "Name", type: INPUT_TYPES.TEXT },
	quote: { label: "Type your quote here!", type: INPUT_TYPES.TEXTAREA },
};

export type CreateQuoteFormType = {
	name: string;
	quote: string;
	bgColor: string;
	userId?: string;
};
