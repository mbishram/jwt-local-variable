import { NextApiRequest, NextApiResponse } from "next";
import { NextJson } from "@/models/next-json";
import { connectToDatabase } from "@/libs/mongodb/setup";
import bcrypt from "bcryptjs";
import { LoginRequest } from "@/types/libs/login-request";
import { aesDecrypt } from "@/libs/aes";
import { UserModel } from "@/models/user-model";
import { generateAccessToken } from "@/libs/api/generate-access-token";
import { generateRefreshToken } from "@/libs/api/generate-refresh-token";
import { FetcherLoginResponseData } from "@/types/libs/mongodb/auth-fetcher";
import { getTokenData } from "@/libs/api/get-token-data";

/**
 * User login
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 */
export const login = async (req: NextApiRequest, res: NextApiResponse) => {
	const reqUser: LoginRequest = req.body;
	const reqUsername = reqUser.username;
	const reqPassword = aesDecrypt(reqUser.password);

	const notValidMessage = new NextJson({
		message: "Login failed! Check your username and password.",
		success: false,
	});

	try {
		let { db } = await connectToDatabase();

		const userRes = await db.collection("users").findOne({
			$or: [{ username: reqUsername }, { email: reqUsername }],
		});
		if (!userRes) {
			return res.status(401).json(
				new NextJson({
					message: "Login failed! User was not found.",
					success: false,
				})
			);
		}

		const isPasswordValid = await bcrypt.compare(
			reqPassword,
			userRes.password
		);
		if (!isPasswordValid) {
			return res.status(401).json(notValidMessage);
		}

		const user = new UserModel({
			username: userRes.username,
			email: userRes.email,
			name: userRes.name,
		});
		const accessToken = await generateAccessToken(user);
		const refreshToken = await generateRefreshToken(user);

		return res.json(
			new NextJson<FetcherLoginResponseData>({
				success: true,
				message: "Login success!",
				data: [{ accessToken, refreshToken }],
			})
		);
	} catch (error: any) {
		return res.status(401).json(notValidMessage);
	}
};

/**
 * Get User Info
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 */
export const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
	const authorizationHeader = (req?.headers?.Authorization || "") as string;
	const [data, error] = await getTokenData(
		authorizationHeader,
		String(process.env.ACCESS_TOKEN_SECRET_KEY)
	);

	if (error) {
		return res.status(401).json(error);
	}

	return res.status(200).json(
		new NextJson({
			success: true,
			message: "Get user success!",
			data: data?.data,
		})
	);
};

/**
 * Get new access token from refresh token
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 */
export const getToken = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(req.headers.Authorization);
	console.log(req);
};

// TODO: logout
