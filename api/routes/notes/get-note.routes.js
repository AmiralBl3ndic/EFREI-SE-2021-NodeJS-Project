const { StatusCodes } = require('http-status-codes');
const canReadNote = require('../../middlewares/auth/can-read-note.middleware');
const canWriteNote = require('../../middlewares/auth/can-write-note.middleware');
const canCreateNote = require('../../middlewares/auth/can-create-note.middleware');
const isAuthor = require('../../middlewares/auth/is-author.middleware');
const supabase = require('../../db');

const router = require('express').Router();

router.get('/users/:username/notes/:noteId', isAuthor, async (req, res) => {
	const { data, error } = await supabase
		.from('notes')
		.select('note_id,title,current_content')
		.eq('note_id', req.params.noteId)
		.limit(1);

	if (error) throw new Error(error.message);

	return res.status(StatusCodes.OK).json({
		username: req.params.username,
		title: data[0].title,
		content: data[0].current_content,
		id: data[0].note_id,
	});
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
		id: data[0].note_id,
		link: '/api/users/'
			.concat(req.params.username)
			.concat('/notes/')
			.concat(data[0].note_id),
		title: req.body.title,
	});
});

// Update the title of a note
router.patch('/users/:username/notes/:noteId', isAuthor, async (req, res) => {
	const { data, error } = await supabase
		.from('notes')
		.update({ title: req.body.title })
		.match({ note_id: req.params.noteId });
	//.match({ author: req.user.id })

	if (error) throw new Error(error.message);

	return res.status(StatusCodes.OK).json(data[0]);
});

// Delete a note as an owner
router.delete('/users/:username/notes/:noteId', isAuthor, async (req, res) => {
	const { data, error } = await supabase
		.from('notes')
		.delete()
		.match({ note_id: req.params.noteId });
	//.match({ author: req.user.id })

	if (error) throw new Error(error.message);

	return res.status(StatusCodes.OK).json(data[0]);
});

module.exports = router;
