import * as variableHandler from "@/libs/token/variable-handler";

export function spyOnRemoveCSRFToken() {
	jest.spyOn(variableHandler, "removeCSRFToken").mockImplementation(() => {});
}
