import Head from "next/head";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";

export default function Login() {
	return (
		<MainLayout disableNav>
			<Head>
				<title>
					Login - {process.env.NEXT_PUBLIC_APPLICATION_NAME}
				</title>
			</Head>
			<main>
				<h1>Welcome to</h1>
			</main>
		</MainLayout>
	);
}
