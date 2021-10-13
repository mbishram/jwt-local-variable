const colors = require("tailwindcss/colors");
const { screens } = require("tailwindcss/defaultTheme");

const minWidthScreens = {};
Object.keys(screens).forEach((key) => {
	minWidthScreens["screen-" + key] = screens[key];
});

module.exports = {
	purge: ["./src/**/*.{jsx,tsx}"],
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
