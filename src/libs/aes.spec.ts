import aes from "crypto-js/aes";
import { aesDecrypt, aesEncrypt } from "@/libs/aes";

describe("AES", () => {
	const text = "lorem ipsum";
	const encryptedText = aes
		.encrypt(text, String(process.env.SALT_FE))
		.toString();

	it("should be able to encrypt", () => {
		expect(aesEncrypt(text)).toBeTruthy();
	});

	it("should be able to decrypt", () => {
		expect(aesDecrypt(encryptedText)).toEqual(text);
	});
});
