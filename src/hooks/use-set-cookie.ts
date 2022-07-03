import { useEffect } from "react";

export function useSetCookie() {
	useEffect(() => {
		document.cookie = "testCookie=Cookie Get!";
	}, []);
}
