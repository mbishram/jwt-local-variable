export const kilobyteToByte = (kilobyte: number) => kilobyte * 1024;

export const generateJunkData = (size: number) =>
	new Blob([new ArrayBuffer(kilobyteToByte(size))], {
		type: "application/octet-stream",
	}).text();

export const checkStringSizeInByte = (string: string) =>
	new TextEncoder().encode(string).length;
