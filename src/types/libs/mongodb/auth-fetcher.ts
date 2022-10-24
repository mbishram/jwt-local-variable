import { ObjectId } from "bson";

export type FetcherLoginResponseData = {
	accessToken?: string;
	refreshToken?: string;
	csrfToken?: string;
};

export type DBTokenResponse = {
	_id?: ObjectId;
	token?: string;
	csrfToken?: string;
	refreshToken?: string;
	userId?: ObjectId;
};
