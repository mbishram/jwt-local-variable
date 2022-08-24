import { useEffect } from "react";
import { UseUserOptions } from "@/types/hooks/use-user-options";
import useSWR from "swr";
import { USER } from "@/libs/fetchers/auth";
import { useRouter } from "next/router";

export function useUser(
	redirectTo: string = "",
	options: UseUserOptions = { redirectIfFound: false }
) {
	const { data: user, mutate: mutateUser } = useSWR(USER, {
		refreshInterval: 1000,
	});
	const history = useRouter();

	useEffect(() => {
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

	return { user, mutateUser };
}
