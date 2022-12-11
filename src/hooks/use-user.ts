import { useEffect, useLayoutEffect } from "react";
import { UseUserOptions } from "@/types/hooks/use-user-options";
import useSWR from "swr";
import { USER } from "@/libs/fetchers/auth";
import { useRouter } from "next/router";

const TIMER_LABEL = "Local Variable (Without CSRF)";

export function useUser(
	redirectTo: string = "",
	options: UseUserOptions = { redirectIfFound: false }
) {
	const { data: user, mutate: mutateUser } = useSWR(USER, {
		refreshInterval: 1000,
	});
	const history = useRouter();

	useEffect(() => {
		// If user fetch success, stop timer
		if (user?.success) console.timeEnd(TIMER_LABEL);

		// Is loading and no redirectTo, do nothing
		if (!redirectTo || !user) return;

		if (
			// On user fetch failed and redirectTo is set, redirect to it
			(!user?.success && !options?.redirectIfFound && redirectTo) ||
			// On user fetch success, redirectIfFound is true, and redirectTo is set, redirect to it
			(user?.success && options?.redirectIfFound && redirectTo)
		) {
			void history.replace(redirectTo);
		}
	}, [user, redirectTo]);

	if (typeof window !== "undefined")
		useLayoutEffect(() => {
			// Start timer
			console.time(TIMER_LABEL);
		}, []);

	return { user, mutateUser };
}
