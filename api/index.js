'use strict';

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

const openAPISpecs = require('yamljs').load('./api/openapi.yml');
const routes = require('./routes/root.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(openAPISpecs));
app.use('/', routes);

app.use((req, res, next) => {
	res.status(StatusCodes.NOT_FOUND).json({
		code: StatusCodes.NOT_FOUND,
		status: getReasonPhrase(StatusCodes.NOT_FOUND),
	});
});

module.exports = app;
