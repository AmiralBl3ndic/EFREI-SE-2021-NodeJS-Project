// Express
const express = require('express');
const session = require('express-session');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const cors = require('cors');
const app = express();

// Config
const { sessionSecret, sentryDsn } = require('./config');

// Swagger
const swaggerUI = require('swagger-ui-express');
const openAPISpecs = require('yamljs').load('./api/openapi.yml');

// Passport
const configuredPassport = require('./auth/passport.config');

// Routes
const apiRoutes = require('./routes/root.routes');

Sentry.init({
	dsn: sentryDsn,
	integrations: [
		new Sentry.Integrations.Http({ tracing: true }),
		new Tracing.Integrations.Express({ app }),
	],
	tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: sessionSecret,
		resave: false,
		saveUninitialized: true,
	}),
);
app.use(configuredPassport.initialize());

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(openAPISpecs));
app.use('/api', apiRoutes);

module.exports = app;
module.exports.Sentry = Sentry;
