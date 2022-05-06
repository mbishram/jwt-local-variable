import aes from "crypto-js/aes";
import CryptoJS from "crypto-js/core";

const KEY = CryptoJS.enc.Base64.parse(
	String(process.env.NEXT_PUBLIC_AES_KEY_FE)
);
const IV = CryptoJS.enc.Base64.parse(String(process.env.NEXT_PUBLIC_AES_IV_FE));

/**
 * Encrypt message using aes
 * @param message {string}
 */
export const aesEncrypt = (message: string) => {
	return aes.encrypt(message, KEY, { iv: IV }).toString();
};

/**
 * Decrypt encrypted message using aes
 * @param cipherText {string}
 */
export const aesDecrypt = (cipherText: string) => {
	return aes.decrypt(cipherText, KEY, { iv: IV }).toString(CryptoJS.enc.Utf8);
};
