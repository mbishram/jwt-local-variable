import { RenderHookOptions } from "@testing-library/react-hooks";
import { SWRConfig } from "swr";
import { ReactNode } from "react";
import { renderHook } from "@testing-library/react-hooks/dom";
import { fetcher } from "@/libs/swr/fetcher";

export function customRenderHook<TProps, TResult>(
	callback: (props: TProps) => TResult,
	options?: RenderHookOptions<TProps>
) {
	const wrapper = ({ children }: { children?: ReactNode }) => (
		<SWRConfig
			value={{ fetcher, dedupingInterval: 0, provider: () => new Map() }}
		>
			{children}
		</SWRConfig>
	);

	return renderHook<TProps, TResult>((props) => callback(props), {
		wrapper,
		...options,
	});
}
