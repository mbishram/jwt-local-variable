import { useEffect } from "react";
import { UseUserOptions } from "@/types/hooks/use-user-options";
import useSWR from "swr";
import { getToken, USER } from "@/libs/fetchers/auth";
import { useRouter } from "next/router";
import {
	saveAccessToken,
	saveRefreshToken,
} from "@/libs/token/local-storage-handler";

export function useUser(
	redirectTo: string = "",
	options: UseUserOptions = { redirectIfFound: false }
) {
	const { data: user, mutate: mutateUser } = useSWR(USER, {
		refreshInterval: 1000,
	});
	const history = useRouter();

	useEffect(() => {
		(async () => {
			let isFinallySkipped = false;

			// Is loading, do nothing
			if (!user) return;

			try {
				// If error, try to refresh token
				if (!user.success) {
					const { data } = await getToken();
					if (data?.success) {
						const token = data.data?.[0];
						if (token?.accessToken && token?.refreshToken) {
							saveAccessToken(token.accessToken);
							saveRefreshToken(token.refreshToken);

							isFinallySkipped = true;
						}
					}
				}
			} catch (e) {
			} finally {
				if (
					// If isFinallySkipped is true, skip finally block
					!isFinallySkipped &&
					// On user fetch failed and redirectTo is set, redirect to it
					((!user?.success &&
						!options?.redirectIfFound &&
						redirectTo) ||
						// On user fetch success, redirectIfFound is true, and redirectTo is set, redirect to it
						(user?.success &&
							options?.redirectIfFound &&
							redirectTo))
				) {
					void (await history.replace(redirectTo));
				}
			}
		})();
	}, [user, redirectTo]);

	return { user, mutateUser };
}
