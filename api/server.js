// Express
const express = require('express');
const session = require('express-session');
const app = express();

// Config
const { sessionSecret } = require('./config');

// Swagger
const swaggerUI = require('swagger-ui-express');
const openAPISpecs = require('yamljs').load('./api/openapi.yml');

// Passport
const configuredPassport = require('./auth/passport.config');

// Routes
const apiRoutes = require('./routes/root.routes');

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
