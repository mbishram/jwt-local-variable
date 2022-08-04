import { useLayoutEffect } from "react";
import {
	deleteAccessToken,
	deleteRefreshToken,
	returnAccessToken,
	returnRefreshToken,
	saveAccessToken,
	saveRefreshToken,
} from "@/libs/token/local-storage-handler";
import {
	getAccessToken,
	getRefreshToken,
	setAccessToken,
	setRefreshToken,
} from "@/libs/token/variable-handler";
import { useUser } from "@/hooks/use-user";

export function useSaveToken() {
	const { mutateUser } = useUser();

	// If client side, run the script
	if (typeof window !== "undefined")
		useLayoutEffect(() => {
			// Restoring token
			setAccessToken(returnAccessToken() || "");
			setRefreshToken(returnRefreshToken() || "");
			deleteAccessToken();
			deleteRefreshToken();
			// Refresh useUser
			void mutateUser();

			// Handle saving token on close/reload
			const handleBeforeUnload = () => {
				saveAccessToken(getAccessToken() || "");
				saveRefreshToken(getRefreshToken() || "");
			};
			window.addEventListener("beforeunload", handleBeforeUnload);
			return () => {
				window.removeEventListener("beforeunload", handleBeforeUnload);
			};
		}, []);
}
