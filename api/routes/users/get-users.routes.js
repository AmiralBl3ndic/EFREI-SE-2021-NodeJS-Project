const { StatusCodes } = require('http-status-codes');
const canReadNote = require('../../middlewares/auth/can-read-note.middleware');
const UserService = require('../../services/user.service');
const NoteService = require('../../services/notes.service');

const supabase = require('../../db');

const router = require('express').Router();

router.get('/:username', async (req, res) => {
	const user = await UserService.findByUsername(req.params.username);

	return res.status(StatusCodes.OK).json(user);
});

module.exports = router;

router.get('/:username/notes', async (req, res) => {
	const notes = await NoteService.getNoteFromUsername(req.params.username);
	return res.status(StatusCodes.OK).json(notes);
});
