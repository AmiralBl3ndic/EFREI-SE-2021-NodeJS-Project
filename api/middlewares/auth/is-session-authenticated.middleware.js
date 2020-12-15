const { StatusCodes } = require('http-status-codes');

const isSessionAuthenticated = (req, res, next) => {
	if (!req.session.user) return res.status(StatusCodes.UNAUTHORIZED).send();

	next();
};

module.exports = isSessionAuthenticated;
