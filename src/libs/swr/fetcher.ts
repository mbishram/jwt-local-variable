import { httpInstance } from "@/libs/fetchers/http";

export const fetcher = (url: string) =>
	httpInstance.get(url).then((res) => res.data);
