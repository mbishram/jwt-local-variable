const randomColor = require("@videsk/tailwind-random-color");

/**
 * Return a random tailwind background color
 */
export const randomBg = () => {
	return new randomColor({
		range: [6, 8],
		prefix: "bg",
	}).pick();
};
