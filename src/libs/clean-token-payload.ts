import { JwtPayload } from "jsonwebtoken";
import { GenericObject } from "@/types/ui/generic-object";

export function cleanTokenPayload(data: JwtPayload) {
	const cleanedPayload = data;
	delete data.iss;
	delete data.sub;
	delete data.aud;
	delete data.exp;
	delete data.nbf;
	delete data.iat;
	delete data.jti;
	return cleanedPayload as GenericObject;
}
