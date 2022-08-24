import * as processValidationToken from "@/libs/api/process-validation-token";
import { NextJson } from "@/models/next-json";

export const spyOnProcessValidationTokenFailedResponse = new NextJson({
	success: false,
	message: "Failed",
});

export function spyOnProcessValidationToken(isSuccess = true) {
	jest.spyOn(
		processValidationToken,
		"processValidationToken"
	).mockImplementation(async () =>
		isSuccess
			? [true, null]
			: [null, spyOnProcessValidationTokenFailedResponse]
	);
}
