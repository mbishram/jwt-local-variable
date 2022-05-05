import { UserModel } from "@/models/user-model";

export type FetcherLoginResponseData = {
	user: UserModel;
	token: {
		accessToken?: string;
		refreshToken?: string;
	};
};
