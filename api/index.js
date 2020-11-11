'use strict';

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

const openAPISpecs = require('yamljs').load('./api/openapi.yml');

const app = express();

app.use('/docs', swaggerUI.serve, swaggerUI.setup(openAPISpecs));

app.use((req, res, next) => {
	res.status(StatusCodes.NOT_FOUND).json({
		code: StatusCodes.NOT_FOUND,
		status: getReasonPhrase(StatusCodes.NOT_FOUND),
	});
});

module.exports = app;
