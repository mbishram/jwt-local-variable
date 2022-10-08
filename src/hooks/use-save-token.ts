import { useLayoutEffect } from "react";
import {
	deleteAccessToken,
	deleteCSRFToken,
	deleteRefreshToken,
	returnAccessToken,
	returnCSRFToken,
	returnRefreshToken,
	saveAccessToken,
	saveCSRFToken,
	saveRefreshToken,
} from "@/libs/token/local-storage-handler";
import {
	getAccessToken,
	getCSRFToken,
	getRefreshToken,
	setAccessToken,
	setCSRFToken,
	setRefreshToken,
} from "@/libs/token/variable-handler";
import { useUser } from "@/hooks/use-user";

export function useSaveToken() {
	const { mutateUser } = useUser();

	// If client side, run the script.
	if (typeof window !== "undefined")
		// useLayoutEffect will run before browser paint any elements.
		useLayoutEffect(() => {
			// Restoring token
			setAccessToken(returnAccessToken() || "");
			setRefreshToken(returnRefreshToken() || "");
			setCSRFToken(returnCSRFToken() || "");
			deleteAccessToken();
			deleteRefreshToken();
			deleteCSRFToken();
			// Re-fetch user
			void mutateUser();

			// Handle saving token on close/reload
			const handleBeforeUnload = () => {
				saveAccessToken(getAccessToken() || "");
				saveRefreshToken(getRefreshToken() || "");
				saveCSRFToken(getCSRFToken() || "");
			};
			window.addEventListener("beforeunload", handleBeforeUnload);
			return () => {
				window.removeEventListener("beforeunload", handleBeforeUnload);
			};
		}, []);
}
