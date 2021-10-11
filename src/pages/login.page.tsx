import Head from "next/head";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Typography } from "@/components/ui/Typography/Typography";
import style from "./login.module.css";
import { Quote } from "@/components/ui/Quote/Quote";
import { QuoteModel } from "@/model/quote-model";
import { LoginForm } from "@/components/login/Form";

export default function Login() {
	return (
		<MainLayout className={style.wrapper} classMain={style.main} disableNav>
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
					})
				}
			/>
			<div>
				<Typography variant="header">login</Typography>
				<Typography className="mb-6">
					Login to create a quote!
				</Typography>
				<LoginForm />
			</div>
		</MainLayout>
	);
}
