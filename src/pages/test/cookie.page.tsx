import { Typography } from "@/components/ui/Typography/Typography";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { Input } from "@/components/ui/Input/Input";
import Head from "next/head";
import { useEffect, useState } from "react";
import { generateJunkData } from "@/libs/test/utils";
import Cookies from "js-cookie";

const TEST_KEY = "COOKIE_TEST";
const TEST_TYPE = "Cookie";

function saveTestData(value: string) {
	Cookies.set(TEST_KEY, value);
}

export function deleteTestData() {
	Cookies.remove(TEST_KEY);
}

export default function Cookie() {
	const [isAlertShown, setIsAlertShown] = useState(false);
	const [size, setSize] = useState<number | "">("");
	const [timer, setTimer] = useState(setTimeout(() => {}));

	const name = "size";

	const initCloseAlert = (immediate = false) => {
		// Close alert after 4 seconds
		clearTimeout(timer);
		setTimer(
			setTimeout(() => setIsAlertShown(false), immediate ? 0 : 4000)
		);
	};

	useEffect(() => {
		return () => {
			deleteTestData();
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			<Head>
				<title>
					{TEST_TYPE} Testing -{" "}
					{process.env.NEXT_PUBLIC_APPLICATION_NAME}
				</title>
			</Head>
			<div className="grid min-h-screen min-w-screen place-content-center">
				<Container className="grid gap-4">
					<Typography variant="header" className="text-center">
						{TEST_TYPE}
					</Typography>
					<div className="flex gap-4 items-center">
						<Input
							id={name}
							name={name}
							placeholder="Size (KB)"
							fullWidth
							value={size}
							type="number"
							onChange={(event) => {
								setSize(
									Number(event?.currentTarget?.value) || ""
								);
								initCloseAlert(true);
							}}
						/>
						<Typography className="opacity-50">KB</Typography>
					</div>
					<Button
						color="primary"
						className="mx-auto"
						onClick={async () => {
							if (size) {
								deleteTestData();
								setIsAlertShown(true);
								initCloseAlert();

								const data = await generateJunkData(size);

								const consoleLabel =
									TEST_TYPE + ` (${size} KB)`;

								console.time(consoleLabel);
								saveTestData(data);
								console.timeEnd(consoleLabel);
							}
						}}
					>
						Set Data and Log
					</Button>
					{isAlertShown && size && (
						<Typography className="text-center">
							{size} KB of data is set!
						</Typography>
					)}
				</Container>
			</div>
		</>
	);
}
