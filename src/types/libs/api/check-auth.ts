import { GenericObject } from "@/types/ui/generic-object";

export type CheckAuth = {
	authorizationHeader: string;
	dataMatch: GenericObject;
	secret: string;
};
