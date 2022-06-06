import aes from "crypto-js/aes";
import { aesDecrypt, aesEncrypt } from "@/libs/aes";
import CryptoJS from "crypto-js/core";

describe("AES", () => {
	const KEY = CryptoJS.enc.Base64.parse(
		String(process.env.NEXT_PUBLIC_AES_KEY_FE)
	);
	const IV = CryptoJS.enc.Base64.parse(
		String(process.env.NEXT_PUBLIC_AES_IV_FE)
	);
	const text = "lorem ipsum";
	const encryptedText = aes.encrypt(text, KEY, { iv: IV }).toString();

	it("should be able to encrypt", () => {
		expect(aesEncrypt(text)).toBeTruthy();
	});

	it("should be able to decrypt", () => {
		expect(aesDecrypt(encryptedText)).toEqual(text);
	});
});
