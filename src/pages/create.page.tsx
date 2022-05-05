import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Typography } from "@/components/ui/Typography/Typography";
import { CreateForm } from "@/components/create/Form/Form";
import { QuotePreview } from "@/components/create/QuotePreview/QuotePreview";
import Head from "next/head";

export default function Create() {
	// TODO: Redirect to /login, when user is not logged in

	return (
		<MainLayout classMain="md:min-w-screen-sm min-w-full max-w-screen-sm mx-auto">
			<Head>
				<title>
					Create - {process.env.NEXT_PUBLIC_APPLICATION_NAME}
				</title>
			</Head>
			<CreateForm
				beforeForm={
					<>
						<QuotePreview />
						<Typography variant="header" className="mt-6">
							Create
						</Typography>
						<Typography className="mb-8">
							Create your quote!
						</Typography>
					</>
				}
			/>
		</MainLayout>
	);
}
