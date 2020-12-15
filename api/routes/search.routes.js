const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const NotesService = require('../services/notes.service');

router.get('/notes', async (req, res) => {
	if (req.query.q == null)
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: 'Missing search query parameter "q"',
		});

	return res
		.status(StatusCodes.OK)
		.json(await NotesService.searchNotes(req.user.user_id, req.query.q));
});

module.exports = router;
