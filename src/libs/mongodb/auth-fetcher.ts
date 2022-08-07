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
import { cleanTokenPayload } from "@/libs/clean-token-payload";
import { JwtPayload } from "jsonwebtoken";
import { processValidationToken } from "@/libs/api/process-validation-token";
import { ObjectId } from "bson";

export const USERS_COLLECTION_NAME = "users";

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

		const userRes = await db.collection(USERS_COLLECTION_NAME).findOne({
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
			id: userRes._id,
			username: userRes.username,
			email: userRes.email,
			name: userRes.name,
		});
		const accessToken = await generateAccessToken(user);
		const refreshToken = await generateRefreshToken();

		if (!(accessToken && refreshToken)) {
			return res.status(500).json(
				new NextJson({
					message: "Something went wrong! Failed to generate token.",
					success: false,
				})
			);
		}

		const [validationTokenData, validationTokenError] =
			await processValidationToken(accessToken, userRes._id, {
				req,
				res,
			});
		if (!validationTokenData && validationTokenError) {
			return res.status(500).json(validationTokenError);
		}

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
	const authorizationHeader = (req?.headers?.authorization || "") as string;
	const [data, error] = await getTokenData(
		authorizationHeader,
		String(process.env.ACCESS_TOKEN_SECRET_KEY)
	);

	if (error) {
		return res.status(200).json(
			new NextJson({
				success: false,
				message: "Failed to fetch user! Token is invalid",
			})
		);
	}

	const payload = data?.data?.[0] as JwtPayload;
	const cleanedPayload = cleanTokenPayload(payload) as UserModel;
	return res.status(200).json(
		new NextJson({
			success: true,
			message: "Get user success!",
			data: [cleanedPayload],
		})
	);
};

/**
 * Generate new access token from refresh token
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 */
export const getToken = async (req: NextApiRequest, res: NextApiResponse) => {
	const authorizationHeader = (req?.headers?.authorization || "") as string;
	const [refreshTokenData, refreshTokenError] = await getTokenData(
		authorizationHeader,
		String(process.env.REFRESH_TOKEN_SECRET_KEY)
	);
	const accessTokenHeader = (req?.headers?.["token-access"] || "") as string;
	const [accessTokenData, accessTokenError] = await getTokenData(
		accessTokenHeader,
		String(process.env.ACCESS_TOKEN_SECRET_KEY),
		{ ignoreExpiration: true }
	);

	if (refreshTokenError || accessTokenError) {
		return res.status(401).json(
			new NextJson({
				success: false,
				message: "Failed to generate token! Token is invalid",
			})
		);
	}

	if (refreshTokenData?.success) {
		const payload = accessTokenData?.data?.[0] as JwtPayload;
		const cleanedPayload = cleanTokenPayload(payload) as UserModel;
		const accessToken = (await generateAccessToken(cleanedPayload)) || "";
		const refreshToken = await generateRefreshToken();

		const [validationTokenData, validationTokenError] =
			await processValidationToken(
				accessToken,
				new ObjectId(cleanedPayload.id),
				{
					req,
					res,
				}
			);
		if (!validationTokenData && validationTokenError) {
			return res.status(500).json(validationTokenError);
		}

		return res.status(200).json(
			new NextJson({
				success: true,
				message: "Token generated!",
				data: [{ accessToken, refreshToken }],
			})
		);
	}
};

// TODO: Create logout method, it delete token from db, and delete cookie
