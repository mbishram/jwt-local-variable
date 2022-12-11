import { useEffect, useLayoutEffect } from "react";
import { UseUserOptions } from "@/types/hooks/use-user-options";
import useSWR from "swr";
import { getToken, USER } from "@/libs/fetchers/auth";
import { useRouter } from "next/router";
import {
	setAccessToken,
	setRefreshToken,
} from "@/libs/token/local-storage-handler";

const TIMER_LABEL = "Local Storage + Cookie";

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
							setAccessToken(token.accessToken);
							setRefreshToken(token.refreshToken);

							isFinallySkipped = true;
						}
					}
				}
			} catch (e) {
			} finally {
				// Stop timer
				console.timeEnd(TIMER_LABEL);

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

	if (typeof window !== "undefined")
		useLayoutEffect(() => {
			// Start timer
			console.time(TIMER_LABEL);
		}, []);

	return { user, mutateUser };
}
