import { NextApiRequest, NextApiResponse } from "next";

type mockAPIArgsOptions = Partial<NextApiRequest>;

/**
 * Arguments for NextJS API
 * @constructor
 * @returns {req, res}
 */
export const mockAPIArgs = (options: mockAPIArgsOptions = {}) => {
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
