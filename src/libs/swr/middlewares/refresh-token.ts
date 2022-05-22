import { Middleware, SWRHook } from "swr";

export const refreshTokenMiddleware: Middleware =
	(useSWRNext: SWRHook) => (key, fetcher, config) => {
		// Before
		const swr = useSWRNext(key, fetcher, config);
		console.log(swr);
		// After
		return swr;
	};
