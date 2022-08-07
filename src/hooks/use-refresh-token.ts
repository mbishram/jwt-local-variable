import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import { getToken } from "@/libs/fetchers/auth";
import { setAccessToken, setRefreshToken } from "@/libs/token/variable-handler";

export function useRefreshToken() {
	const { user } = useUser();

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
						if (token?.accessToken && token?.refreshToken) {
							setAccessToken(token.accessToken);
							setRefreshToken(token.refreshToken);
						}
					}
				}
			} catch (e) {}
		})();
	}, [user]);
}
