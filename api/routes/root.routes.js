const express = require('express');
const { StatusCodes } = require('http-status-codes');

const router = express.Router();

const authRoutes = require('./auth');

router.use('/auth', authRoutes);

router.use((req, res, next) => {
	return res.status(StatusCodes.NOT_FOUND).json({
		error: true,
		status: 'Not found',
	});
});

module.exports = router;
