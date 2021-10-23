import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Typography } from "@/components/ui/Typography/Typography";
import { Quote } from "@/components/ui/Quote/Quote";
import { QuoteClass } from "@/classes/quote-class";
import Head from "next/head";
import axios from "axios";
import { convertToClass } from "@/libs/convert-to-class";
import { NextJson } from "@/classes/next-json";
import { Link } from "@/components/ui/Link/Link";

export default function Index({ quotes }: Props) {
	return (
		<MainLayout classMain="max-w-screen-sm mx-auto">
			<Head>
				<title>Home - {process.env.NEXT_PUBLIC_APPLICATION_NAME}</title>
			</Head>
			<Typography variant="header" className="mb-6">
				Give a little color to your Quote!
			</Typography>
			<div className="grid gap-6">
				{quotes.length ? (
					<Quote
						data={
							new QuoteClass({
								quote: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aliquam assumenda, aut blanditiis, consectetur corporis delectus ea earum eos error fugit, in iste libero nobis odit similique vero voluptatum.",
								name: "James Agus",
								bgColor: "bg-red-700",
							})
						}
					/>
				) : (
					<p>
						We can&apos;t find any quote.{" "}
						<Link href="/create">Create some</Link>!
					</p>
				)}
			</div>
		</MainLayout>
	);
}

type Props = { quotes: Array<QuoteClass> };

export async function getServerSideProps() {
	// Get the current environment
	const dev = process.env.NODE_ENV !== "production";
	const { DEV_URL, PROD_URL } = process.env;
	const apiURL = dev ? DEV_URL : PROD_URL;

	// Request posts from api
	const res = await axios.get(`${apiURL}/api/quotes`);
	const { data } = res.data as NextJson<QuoteClass>;

	// Convert into array of class
	const convertedArray = convertToClass(data || [], QuoteClass);

	return {
		props: {
			quotes: convertedArray,
		},
	};
}
