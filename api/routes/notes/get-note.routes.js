const { StatusCodes } = require('http-status-codes');
const canReadNote = require('../../middlewares/auth/can-read-note.middleware');
const canWriteNote = require('../../middlewares/auth/can-write-note.middleware');
const canCreateNote = require('../../middlewares/auth/can-create-note.middleware');
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

// Create a note as a user
router.post('/users/:username/notes', canCreateNote, async (req, res) => {
	const { data, error } = await supabase.from('notes').insert([
		{
			author: req.user.user_id,
			title: req.body.title,
		},
	]);

	if (error) throw new Error(error.message);

	return res.status(StatusCodes.CREATED).json({
		id: req.body.noteId,
		link: req.body.link,
		title: req.body.title,
	});
});

// Update the title of a note
router.patch(
	'/users/:username/notes/:noteId',
	canWriteNote,
	async (req, res) => {
		const { data, error } = await supabase
			.from('notes')
			.update({
				data: { title: req.body.title },
			})
			.eq('note_id', req.params.noteId)
			.eq('author', req.params.username);

		if (error) throw new Error(error.message);

		return res.status(StatusCodes.OK).json(data[0]);
	},
);

module.exports = router;
