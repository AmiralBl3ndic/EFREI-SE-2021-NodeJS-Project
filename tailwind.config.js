const windmill = require('@windmill/react-ui/config');

module.exports = windmill({
	purge: [],
	theme: {
		extend: {
			minHeight: {
				'1/2': '50%',
			},
		},
	},
	variants: {},
	plugins: [],
});
