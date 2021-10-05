module.exports = {
	purge: ["./src/**/*.{jsx,tsx}"],
	darkMode: false,
	theme: {
		extend: {
			fontFamily: {
				sans: ["Roboto", "ui-sans-serif", "system-ui", "-apple-system"],
			},
			transitionProperty: {
				bg: "background-color",
			},
			zIndex: {
				"-10": "-10",
			},
		},
	},
};
