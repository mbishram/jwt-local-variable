import { FormikBuilder } from "@/components/ui/FormikBuilder/FormikBuilder";
import { LOGIN_INPUT_ATTR, LoginFormType } from "@/forms/login";
import { FormikHandleSubmit } from "@/types/forms/formik-handle-submit";
import { HTMLProps, useEffect, useState } from "react";
import { login } from "@/libs/fetchers/auth";
import { useRouter } from "next/router";
import { aesEncrypt } from "@/libs/aes";
import {
	setAccessToken,
	setRefreshToken,
} from "@/libs/token/local-storage-handler";

/**
 * To separate login logic
 * @param className
 * @constructor
 */
export function LoginForm({
	className,
}: Pick<HTMLProps<HTMLFormElement>, "className">) {
	const router = useRouter();
	const [timer, setTimer] = useState(setTimeout(() => {}));
	const initialValues = {
		username: "",
		password: "",
	};

	const handleSubmit: FormikHandleSubmit<LoginFormType> = async (
		values,
		{ setStatus }
	) => {
		try {
			const { data } = await login({
				username: values.username,
				password: aesEncrypt(values.password),
			});

			if (data?.success) {
				const token = data.data?.[0].token;
				if (token?.accessToken && token?.refreshToken) {
					setAccessToken(token.accessToken);
					setRefreshToken(token.refreshToken);
				}
				await router.push("/");
			}
		} catch (error: any) {
			setStatus(error?.response?.data);

			// Close alert
			setTimer(setTimeout(() => setStatus(), 4000));
		}
	};

	useEffect(() => {
		return () => {
			clearTimeout(timer);
		};
	});

	return (
		<FormikBuilder
			inputAttr={LOGIN_INPUT_ATTR}
			initialValues={initialValues}
			onSubmit={handleSubmit}
			className={className}
		/>
	);
}
