import { useEffect } from "react";
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

export function useSaveToken() {
	useEffect(() => {
		// Restoring token
		setAccessToken(returnAccessToken() || "");
		setRefreshToken(returnRefreshToken() || "");
		deleteAccessToken();
		deleteRefreshToken();

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
