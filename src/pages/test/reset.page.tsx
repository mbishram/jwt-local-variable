import Head from "next/head";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Typography } from "@/components/ui/Typography/Typography";
import { useEffect } from "react";
import { resetTest } from "@/libs/fetchers/test";
import { useRouter } from "next/router";
import {
	removeAccessToken,
	removeCSRFToken,
} from "@/libs/token/variable-handler";
import { useUser } from "@/hooks/use-user";
import { logout } from "@/libs/fetchers/auth";

export default function ResetTest() {
	const router = useRouter();
	const { mutateUser } = useUser();

	useEffect(() => {
		(async () => {
			try {
				await resetTest();
				alert("Test successfully reset!");

				// Logout user
				await logout();
			} catch (e) {
				alert("Test failed to reset!");
			} finally {
				// Logout user
				removeCSRFToken();
				removeAccessToken();
				await mutateUser({ success: false });

				void router.replace("/");
			}
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<MainLayout
			className="max-w-screen-xl"
			classMain="grid md:grid-cols-2 gap-8 items-center content-center md:mt-0 mt-6"
		>
			<Head>
				<title>
					Reset Test - {process.env.NEXT_PUBLIC_APPLICATION_NAME}
				</title>
			</Head>
			<div className="mx-auto">
				<Typography>Resetting data ...</Typography>
			</div>
		</MainLayout>
	);
}
