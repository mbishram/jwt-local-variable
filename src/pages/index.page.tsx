import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Typography } from "@/components/ui/Typography/Typography";
import { Quote } from "@/components/ui/Quote/Quote";
import { QuoteModel } from "@/model/quote-model";

export default function Index() {
	return (
		<MainLayout classMain="max-w-screen-sm mx-auto">
			<Typography variant="header" className="mb-6">
				Give a little color to your Quote!
			</Typography>
			<div className="grid gap-6">
				<Quote
					data={
						new QuoteModel({
							quote: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aliquam assumenda, aut blanditiis, consectetur corporis delectus ea earum eos error fugit, in iste libero nobis odit similique vero voluptatum.",
							name: "James Agus",
							bgColor: "bg-red-700",
						})
					}
				/>
				<Quote
					data={
						new QuoteModel({
							quote: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aliquam assumenda, aut blanditiis, consectetur corporis delectus ea earum eos error fugit, in iste libero nobis odit similique vero voluptatum.",
							name: "James Agus",
							bgColor: "bg-yellow-600",
						})
					}
				/>
				<Quote
					data={
						new QuoteModel({
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
