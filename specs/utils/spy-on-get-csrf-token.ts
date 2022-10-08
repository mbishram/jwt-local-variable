import * as variableHandler from "@/libs/token/variable-handler";

export function spyOnGetCSRFToken(returnValue: any) {
	jest.spyOn(variableHandler, "getCSRFToken").mockImplementation(
		() => returnValue
	);
}
