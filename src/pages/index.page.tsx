import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Typography } from "@/components/ui/Typography/Typography";
import { Quote } from "@/components/ui/Quote/Quote";
import { QuoteClass } from "@/classes/quote-class";
import Head from "next/head";

export default function Index() {
	return (
		<MainLayout classMain="max-w-screen-sm mx-auto">
			<Head>
				<title>Home - {process.env.NEXT_PUBLIC_APPLICATION_NAME}</title>
			</Head>
			<Typography variant="header" className="mb-6">
				Give a little color to your Quote!
			</Typography>
			<div className="grid gap-6">
				<Quote
					data={
						new QuoteClass({
							quote: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aliquam assumenda, aut blanditiis, consectetur corporis delectus ea earum eos error fugit, in iste libero nobis odit similique vero voluptatum.",
							name: "James Agus",
							bgColor: "bg-red-700",
						})
					}
				/>
				<Quote
					data={
						new QuoteClass({
							quote: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aliquam assumenda, aut blanditiis, consectetur corporis delectus ea earum eos error fugit, in iste libero nobis odit similique vero voluptatum.",
							name: "James Agus",
							bgColor: "bg-yellow-600",
						})
					}
				/>
				<Quote
					data={
						new QuoteClass({
							quote: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aliquam assumenda, aut blanditiis, consectetur corporis delectus ea earum eos error fugit, in iste libero nobis odit similique vero voluptatum.",
							name: "James Agus",
							bgColor: "bg-gray-800",
						})
					}
				/>
			</div>
		</MainLayout>
	);
}

// TODO: Use getServerSideProps
// export async function getServerSideProps(context) {
// 	// get the current environment
// 	let dev = process.env.NODE_ENV !== 'production';
// 	let { DEV_URL, PROD_URL } = process.env;
//
// 	// request posts from api
// 	let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
// 	// extract the data
// 	let data = await response.json();
//
// 	return {
// 		props: {
// 			posts: data['message'],
// 		},
// 	};
// }
