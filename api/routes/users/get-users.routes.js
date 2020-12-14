const { StatusCodes } = require('http-status-codes');
const canReadNote = require('../../middlewares/auth/can-read-note.middleware');
const UserService = require('../../services/user.service');

const supabase = require('../../db');

const router = require('express').Router();

router.get('/:username', async (req, res) => {
	const user = await UserService.findByUsername(req.params.username);

	return res.status(StatusCodes.OK).json(user);
});

module.exports = router;
