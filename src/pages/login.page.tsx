import Head from "next/head";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import Image from "next/image";
import loginImg from "@/images/login-img.jpg";
import { Typography } from "@/components/Typography/Typography";
import style from "./login.module.css";

export default function Login() {
	return (
		<MainLayout className={style.wrapper} classMain={style.main} disableNav>
			<Head>
				<title>
					Login - {process.env.NEXT_PUBLIC_APPLICATION_NAME}
				</title>
			</Head>
			<div className={style.image}>
				<Image
					src={loginImg}
					layout="fill"
					objectFit="cover"
					alt="Kucing"
					className="rounded-xl"
				/>
			</div>
			<div>
				<Typography variant="header">
					Login untuk melihat kucing!
				</Typography>
			</div>
		</MainLayout>
	);
}
