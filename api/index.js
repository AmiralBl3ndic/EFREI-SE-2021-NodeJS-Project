'use strict';

const express = require('express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

const app = express();

app.use((req, res, next) => {
	res.status(StatusCodes.NOT_FOUND).json({
		code: StatusCodes.NOT_FOUND,
		status: getReasonPhrase(StatusCodes.NOT_FOUND),
	});
});

module.exports = app;
