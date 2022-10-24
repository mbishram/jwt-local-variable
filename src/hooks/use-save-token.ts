import { useLayoutEffect } from "react";
import {
	deleteAccessToken,
	deleteCSRFToken,
	returnAccessToken,
	returnCSRFToken,
	saveAccessToken,
	saveCSRFToken,
} from "@/libs/token/storage-handler";
import {
	getAccessToken,
	getCSRFToken,
	setAccessToken,
	setCSRFToken,
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
			setCSRFToken(returnCSRFToken() || "");
			deleteAccessToken();
			deleteCSRFToken();
			// Re-fetch user
			void mutateUser();

			// Handle saving token on close/reload
			const handleBeforeUnload = () => {
				saveAccessToken(getAccessToken() || "");
				saveCSRFToken(getCSRFToken() || "");
			};
			window.addEventListener("beforeunload", handleBeforeUnload);
			return () => {
				window.removeEventListener("beforeunload", handleBeforeUnload);
			};
		}, []);
}
