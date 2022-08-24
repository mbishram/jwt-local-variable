import * as isTokenValid from "@/libs/api/is-token-valid";

export function spyOnIsTokenValid(returnValue: boolean = true) {
	jest.spyOn(isTokenValid, "isTokenValid").mockImplementation(
		async () => returnValue
	);
}
