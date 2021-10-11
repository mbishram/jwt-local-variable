import { INPUT_TYPES } from "@/constants/input-types";
import { InputAttr } from "@/types/forms/input-attr";

/**
 * To generate login's form input.
 */
export const LOGIN_INPUT_ATTR: InputAttr = {
	username: { label: "Email/Username", type: INPUT_TYPES.TEXT },
	password: { label: "Password", type: INPUT_TYPES.PASSWORD },
};
