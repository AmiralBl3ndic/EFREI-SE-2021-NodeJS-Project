const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();

router.post('/', (req, res) => {
	return res.status(StatusCodes.NOT_IMPLEMENTED).send();
});

module.exports = router;
