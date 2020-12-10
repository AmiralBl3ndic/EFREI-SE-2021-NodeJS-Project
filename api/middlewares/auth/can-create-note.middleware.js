const { StatusCodes } = require('http-status-codes');

const canCreateNote = async (req, res, next) => {
	//TODO : verify this middleware @Camille
	if (!req.user) {
		return res.status(StatusCodes.UNAUTHORIZED).send();
	}
	if (req.user.username !== req.params.username) {
		return res.status(StatusCodes.FORBIDDEN).send();
	}
	next();
};

module.exports = canCreateNote;
