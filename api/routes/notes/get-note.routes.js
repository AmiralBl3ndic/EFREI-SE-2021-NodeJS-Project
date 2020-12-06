const { StatusCodes } = require('http-status-codes');
const canReadNote = require('../../middlewares/auth/can-read-note.middleware');
const supabase = require('../../db');

const router = require('express').Router();

router.get('/:noteId', canReadNote, async (req, res) => {
	const { data, error } = await supabase
		.from('notes')
		.select('note_id,title,current_content')
		.eq('note_id', req.params.noteId)
		.limit(1);

	if (error) throw new Error(error.message);

	return res.status(StatusCodes.OK).json(data[0]);
});

module.exports = router;
