import { useEffect } from "react";
import { UseUserOptions } from "@/types/hooks/use-user-options";
import useSWR from "swr";
import { USER } from "@/libs/fetchers/auth";
import { useRouter } from "next/router";
import { refreshTokenMiddleware } from "@/libs/swr/middlewares/refresh-token";

export function useUser(
	redirectTo: string = "",
	options: UseUserOptions = { redirectIfFound: false }
) {
	const {
		data: user,
		mutate: mutateUser,
		error,
	} = useSWR(USER, {
		refreshInterval: 5000,
		use: [refreshTokenMiddleware],
	});
	const history = useRouter();

	useEffect(() => {
		if (!redirectTo || (!error && !user)) return;

		if (
			(!user?.success &&
				error &&
				!options?.redirectIfFound &&
				redirectTo) ||
			(user?.success && !error && options?.redirectIfFound && redirectTo)
		) {
			void history.push(redirectTo);
		}
	}, [user, error, redirectTo]);

	return { user, mutateUser, error };
}
