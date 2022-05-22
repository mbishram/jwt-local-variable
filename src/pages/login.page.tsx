import Head from "next/head";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Typography } from "@/components/ui/Typography/Typography";
import { Quote } from "@/components/ui/Quote/Quote";
import { QuoteModel } from "@/models/quote-model";
import { LoginForm } from "@/components/login/Form/Form";
import { randomBg } from "@/libs/random-bg";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";

export default function Login() {
	useUser("/", { redirectIfFound: true });

	const [quoteData, setQuoteData] = useState(
		new QuoteModel({
			quote: "Give a little color to your quote!",
			name: "James Doe",
			bgColor: randomBg(),
		})
	);

	useEffect(() => {
		setQuoteData({ ...quoteData, bgColor: randomBg() });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<MainLayout
			className="max-w-screen-xl"
			classMain="grid md:grid-cols-2 gap-8 items-center content-center md:mt-0 mt-6"
			disableNav
		>
			<Head>
				<title>
					Login - {process.env.NEXT_PUBLIC_APPLICATION_NAME}
				</title>
			</Head>
			<Quote data={quoteData} />
			<div className="mx-auto md:min-w-0 min-w-full md:w-80">
				<Typography variant="header">Login</Typography>
				<Typography className="mb-8">
					Login to create a quote!
				</Typography>
				<LoginForm />
			</div>
		</MainLayout>
	);
}
