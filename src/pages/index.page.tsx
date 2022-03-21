import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Typography } from "@/components/ui/Typography/Typography";
import { Quote } from "@/components/ui/Quote/Quote";
import { QuoteModel } from "@/models/quote-model";
import Head from "next/head";
import { convertToClass } from "@/libs/convert-to-class";
import { NextJson } from "@/models/next-json";
import { Link } from "@/components/ui/Link/Link";
import { getAllQuotes } from "@/libs/mongodb/quotes-fetcher";

export default function Index({ quotes }: Props) {
	const parsedQuotes: Array<QuoteModel> = quotes && JSON.parse(quotes);
	return (
		<MainLayout classMain="max-w-screen-sm mx-auto">
			<Head>
				<title>Home - {process.env.NEXT_PUBLIC_APPLICATION_NAME}</title>
			</Head>
			<Typography variant="header" className="mb-6">
				Give a little color to your Quote!
			</Typography>
			<div className="grid gap-6">
				{parsedQuotes.length ? (
					parsedQuotes.map((quote, index) => (
						<Quote key={`quote-key-${index}`} data={quote} />
					))
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

type Props = { quotes: string };

export async function getServerSideProps() {
	// Request posts from api
	const { data } = (await getAllQuotes()) as NextJson<QuoteModel>;

	// Convert into array of class
	const convertQuotes = convertToClass(data || [], QuoteModel);

	return {
		props: {
			quotes: JSON.stringify(convertQuotes),
		},
	};
}
