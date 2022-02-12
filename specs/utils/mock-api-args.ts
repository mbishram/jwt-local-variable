import { NextApiRequest, NextApiResponse } from "next";

/**
 * Arguments for NextJS API
 * @constructor
 * @returns {req, res}
 */
export const mockAPIArgs = (options: Partial<NextApiRequest>) => {
	const json = jest.fn((result) => result);
	const req = {
		...options,
	} as NextApiRequest;
	const res = {
		status: jest.fn(() => ({
			json,
		})),
		setHeader: jest.fn(),
		json,
	} as unknown as NextApiResponse;

	return { req, res };
};
