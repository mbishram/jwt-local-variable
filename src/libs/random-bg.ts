const randomColor = require("@videsk/tailwind-random-color");

export const randomBg = () => {
	return new randomColor({
		range: [6, 8],
		prefix: "bg",
	}).pick();
};
