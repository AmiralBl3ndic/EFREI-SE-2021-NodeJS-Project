'use strict';

// NextJS
const dev = process.env.NODE_ENV !== 'production';
const nextApp = require('next')({ dev });

// Express
const express = require('express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

// Swagger
const swaggerUI = require('swagger-ui-express');
const openAPISpecs = require('yamljs').load('./api/openapi.yml');

// Passport
const configuredPassport = require('./auth/passport.config');

// Routes
const routes = require('./routes/root.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(configuredPassport.initialize());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(openAPISpecs));
app.use('/', routes);

app.use((req, res, next) => {
	res.status(StatusCodes.NOT_FOUND).json({
		code: StatusCodes.NOT_FOUND,
		status: getReasonPhrase(StatusCodes.NOT_FOUND),
	});
});

module.exports = app;
