import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import { getToken } from "@/libs/fetchers/auth";
import { setAccessToken, setCSRFToken } from "@/libs/token/variable-handler";

export function useRefreshToken() {
	const { user, mutateUser } = useUser();

	useEffect(() => {
		(async () => {
			// Is loading, do nothing
			if (!user) return;

			try {
				// If error, try to refresh token
				if (!user.success) {
					const { data } = await getToken();
					if (data?.success) {
						const token = data.data?.[0];
						if (token?.accessToken && token?.csrfToken) {
							setAccessToken(token.accessToken);
							setCSRFToken(token.csrfToken);
							await mutateUser();
						}
					}
				}
			} catch (e) {}
		})();
	}, [user]);
}
