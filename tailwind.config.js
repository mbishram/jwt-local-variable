const colors = require("tailwindcss/colors");
const { screens } = require("tailwindcss/defaultTheme");

const minWidthScreens = {};
Object.keys(screens).forEach((key) => {
	minWidthScreens["screen-" + key] = screens[key];
});

module.exports = {
	purge: {
		content: ["./src/**/*.{jsx,tsx}"],
		safelist: [
			"bg-gray-600",
			"bg-gray-700",
			"bg-gray-800",
			"bg-red-600",
			"bg-red-700",
			"bg-red-800",
			"bg-yellow-600",
			"bg-yellow-700",
			"bg-yellow-800",
			"bg-green-600",
			"bg-green-700",
			"bg-green-800",
			"bg-blue-600",
			"bg-blue-700",
			"bg-blue-800",
			"bg-indigo-600",
			"bg-indigo-700",
			"bg-indigo-800",
			"bg-purple-600",
			"bg-purple-700",
			"bg-purple-800",
			"bg-pink-600",
			"bg-pink-700",
			"bg-pink-800",
		],
	},
	darkMode: false,
	theme: {
		extend: {
			colors: {
				primary: colors.blue,
				secondary: colors.gray,
			},
			fontFamily: {
				sans: ["Roboto", "ui-sans-serif", "system-ui", "-apple-system"],
			},
			transitionProperty: {
				bg: "background-color",
			},
			zIndex: {
				"-10": "-10",
			},
			minWidth: {
				...minWidthScreens,
			},
		},
	},
};
