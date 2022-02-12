/**
 * Extract token from authorization header
 * @param authorizationHeader Bearer Token
 * @return token
 */
export const extractToken = (authorizationHeader?: string) => {
	if (authorizationHeader && authorizationHeader.startsWith("Bearer "))
		return authorizationHeader.split(" ")[1];

	return "";
};
