import * as variableHandler from "@/libs/token/variable-handler";

export function spyOnSetCSRFToken() {
	jest.spyOn(variableHandler, "setCSRFToken").mockImplementation(() => {});
}
