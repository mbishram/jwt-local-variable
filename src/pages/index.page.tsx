import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Typography } from "@/components/ui/Typography/Typography";
import { Quote } from "@/components/ui/Quote/Quote";
import { QuoteModel } from "@/models/quote-model";
import Head from "next/head";
import { convertToClass } from "@/libs/convert-to-class";
import { NextJson } from "@/models/next-json";
import { Link } from "@/components/ui/Link/Link";
import { getAllQuotes } from "@/libs/mongodb/quotes-fetcher";
import { Button } from "@/components/ui/Button/Button";
import { deleteAllQuote } from "@/libs/fetchers/quotes";
import { useEffect, useState } from "react";
import { Alert } from "@/components/ui/Alert/Alert";
import { AlertDataType } from "@/types/components/alert-data-type";
import { TrashFill } from "react-bootstrap-icons";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/router";

export default function Index({ quotes }: Props) {
	const parsedQuotes: Array<QuoteModel> = quotes && JSON.parse(quotes);

	const [alertData, setAlertData] = useState<AlertDataType>({
		isOpen: false,
	});
	const [alertTimer, setAlertTimer] = useState(setTimeout(() => {}));
	const { user } = useUser();
	const router = useRouter();

	const refreshData = () => {
		void router.replace(router.asPath);
	};

	const handleDeleteAllClick = async () => {
		try {
			const res = await deleteAllQuote();
			refreshData();
			setAlertData({
				isOpen: true,
				type: "success",
				message: res?.data?.message,
			});
		} catch (error: any) {
			setAlertData({
				isOpen: true,
				type: "danger",
				message:
					error?.response?.data?.message || "Something went wrong!",
			});
		} finally {
			// Close alert
			setAlertTimer(
				setTimeout(() => setAlertData({ isOpen: false }), 4000)
			);
		}
	};

	useEffect(() => {
		return () => {
			clearTimeout(alertTimer);
		};
	}, []);

	return (
		<MainLayout classMain="max-w-screen-sm mx-auto">
			<Head>
				<title>Home - {process.env.NEXT_PUBLIC_APPLICATION_NAME}</title>
			</Head>
			{alertData?.isOpen && (
				<Alert type={alertData?.type}>{alertData?.message}</Alert>
			)}
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
			{user?.success && (
				<Button
					color="primary"
					onClick={async () => {
						await handleDeleteAllClick();
					}}
					title="Delete all your quotes!"
					icon
					fab
				>
					<TrashFill />
				</Button>
			)}
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
