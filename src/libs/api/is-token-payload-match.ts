import { JwtPayload } from "jsonwebtoken";
import { GenericObject } from "@/types/ui/generic-object";

/**
 * Comparing received data and token's payload
 * @param data {GenericObject} Request's data
 * @param tokenPayload {JwtPayload | string} Token's data
 */
export function isTokenPayloadMatch(
	data: GenericObject,
	tokenPayload: JwtPayload | string
) {
	if (typeof tokenPayload === "string") return false;

	return Object.keys(data).every((key) => {
		if (data[key] === undefined) return true;
		return data[key] === tokenPayload[key];
	});
}
