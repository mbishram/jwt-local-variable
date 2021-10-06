import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APPLICATION_NAME}</title>
				<meta
					name="description"
					content="A way to store JSON Web Token on Local Variable to make it more secure from an XSS and CSRF attack."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default CustomApp;
