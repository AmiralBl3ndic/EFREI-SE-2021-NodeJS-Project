/* eslint-disable spaced-comment */
'use strict';

require('dotenv').config();

////////////////////////////////////////////////////////////
// Default configuration values
////////////////////////////////////////////////////////////
const defaultPort = 3000;

////////////////////////////////////////////////////////////
// Verify required environment variables are set
////////////////////////////////////////////////////////////
const requiredEnvVariables = [
	'SUPABASE_URL',
	'SUPABASE_PUBLIC_KEY',
	'SUPABASE_DB_HOST',
	'SUPABASE_DB_NAME',
	'SUPABASE_DB_PORT',
	'SUPABASE_DB_USER',
	'SUPABASE_DB_PASSWORD',
	'JWT_SECRET',
	'SESSION_SECRET',
	'SENTRY_DSN',
];

// Check that each required variable is set with a value that is not null nor undefined
requiredEnvVariables.forEach((variable) => {
	if (process.env[variable] == null) {
		// eslint-disable-next-line no-console
		console.error(
			`Environment variable ${variable} must be set for the app to run`,
		);
		process.exit(1);
	}
});

////////////////////////////////////////////////////////////
// Compute actual configuration values
////////////////////////////////////////////////////////////
const port = +process.env.PORT || defaultPort;
const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublicKey = process.env.SUPABASE_PUBLIC_KEY;
const supabaseDbHost = process.env.SUPABASE_DB_HOST;
const supabaseDbName = process.env.SUPABASE_DB_NAME;
const supabaseDbPort = process.env.SUPABASE_DB_PORT;
const supabaseDbUser = process.env.SUPABASE_DB_USER;
const supabaseDbPassword = process.env.SUPABASE_DB_PASSWORD;
const jwtSecret = process.env.JWT_SECRET;
const sessionSecret = process.env.SESSION_SECRET;
const sentryDsn = process.env.SENTRY_DSN;

////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////

module.exports = {
	port,
	supabaseUrl,
	supabasePublicKey,
	supabaseDbHost,
	supabaseDbName,
	supabaseDbPort,
	supabaseDbUser,
	supabaseDbPassword,
	jwtSecret,
	sessionSecret,
	sentryDsn,
};

module.exports.port = port;
module.exports.supabaseUrl = supabaseUrl;
module.exports.supabasePublicKey = supabasePublicKey;
module.exports.supabaseDbHost = supabaseDbHost;
module.exports.supabaseDbName = supabaseDbName;
module.exports.supabaseDbPort = supabaseDbPort;
module.exports.supabaseDbUser = supabaseDbUser;
module.exports.supabaseDbPassword = supabaseDbPassword;
module.exports.jwtSecret = jwtSecret;
module.exports.sessionSecret = sessionSecret;
module.exports.sentryDsn = sentryDsn;
