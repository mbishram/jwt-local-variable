import aes from "crypto-js/aes";
import CryptoJS from "crypto-js/core";

/**
 * Encrypt message using aes
 * @param message {string}
 */
export const aesEncrypt = (message: string) => {
	return aes.encrypt(message, String(process.env.SALT_FE)).toString();
};

/**
 * Decrypt encrypted message using aes
 * @param cipherText {string}
 */
export const aesDecrypt = (cipherText: string) => {
	return aes
		.decrypt(cipherText, String(process.env.SALT_FE))
		.toString(CryptoJS.enc.Utf8);
};
