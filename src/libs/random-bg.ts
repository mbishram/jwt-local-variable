const randomColor = require("@videsk/tailwind-random-color");

/**
 * Return a random tailwind background color
 */
export const randomBg = () => {
	return new randomColor({
		colors: ["gray", "red", "yellow", "purple", "pink"],
		range: [6, 8],
		prefix: "bg",
	}).pick();
};
