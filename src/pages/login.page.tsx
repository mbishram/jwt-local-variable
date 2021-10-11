import Head from "next/head";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Typography } from "@/components/ui/Typography/Typography";
import { Quote } from "@/components/ui/Quote/Quote";
import { QuoteModel } from "@/model/quote-model";
import { LoginForm } from "@/components/login/Form/Form";
import { randomBg } from "@/utils/random-bg";

export default function Login() {
	return (
		<MainLayout
			className="max-w-screen-xl"
			classMain="grid md:grid-cols-2 gap-8 items-center content-center"
			disableNav
		>
			<Head>
				<title>
					Login - {process.env.NEXT_PUBLIC_APPLICATION_NAME}
				</title>
			</Head>
			<Quote
				data={
					new QuoteModel({
						quote: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aliquam assumenda, aut blanditiis, consectetur corporis delectus ea earum eos error fugit, in iste libero nobis odit similique vero voluptatum.",
						name: "James Agus",
						bgColor: randomBg(),
					})
				}
			/>
			<div>
				<Typography variant="header">Login</Typography>
				<Typography className="mb-8">
					Login to create a quote!
				</Typography>
				<LoginForm />
			</div>
		</MainLayout>
	);
}
