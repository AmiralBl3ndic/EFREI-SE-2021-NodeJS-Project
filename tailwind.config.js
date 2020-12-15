// eslint-disable-next-line @typescript-eslint/no-var-requires
const windmill = require('@windmill/react-ui/config');

module.exports = windmill({
	purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
});
