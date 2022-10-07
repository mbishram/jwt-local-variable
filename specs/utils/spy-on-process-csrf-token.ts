import * as processCSRFToken from "@/libs/api/process-csrf-token";
import { NextJson } from "@/models/next-json";

export const spyOnProcessCSRFTokenFailedResponse = new NextJson({
	success: false,
	message: "Failed",
});

export function spyOnProcessCSRFToken(isSuccess = true) {
	jest.spyOn(processCSRFToken, "processCSRFToken").mockImplementation(
		async () =>
			isSuccess
				? [true, null]
				: [null, spyOnProcessCSRFTokenFailedResponse]
	);
}
