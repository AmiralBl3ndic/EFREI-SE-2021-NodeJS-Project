const { StatusCodes } = require('http-status-codes');
const canReadNote = require('../../middlewares/auth/can-read-note.middleware');
const canWriteNote = require('../../middlewares/auth/can-write-note.middleware');
const canCreateNote = require('../../middlewares/auth/can-create-note.middleware');
const isAuthor = require('../../middlewares/auth/is-author.middleware');
const NotesService = require('../../services/notes.service');
const supabase = require('../../db');
const router = require('express').Router();

// Get note informations
router.get('/users/:username/notes/:noteId', canReadNote, async (req, res) => {
	const { data, error } = await supabase
		.from('notes')
		.select('note_id,title,current_content')
		.eq('note_id', req.params.noteId)
		.limit(1);

	if (error) throw new Error(error.message);

	return res.status(StatusCodes.OK).json({
		author: req.params.username,
		title: data[0].title,
		content: data[0].current_content,
		id: data[0].note_id,
	});
});

// Create a note for a user
router.post('/users/:username/notes', canCreateNote, async (req, res) => {
	const { data, error } = await supabase.from('notes').insert([
		{
			author: req.user.user_id,
			title: req.body.title,
		},
	]);
	await supabase.from('notes_access_control').insert([
		{
			user_id: req.user.user_id,
			note: data[0].note_id,
			can_read: true,
			can_write: true,
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

// Update the title of the note
router.patch('/users/:username/notes/:noteId', isAuthor, async (req, res) => {
	const { data, error } = await supabase
		.from('notes')
		.update({ title: req.body.title })
		.match({ note_id: req.params.noteId });

	if (error) throw new Error(error.message);

	return res.status(StatusCodes.OK).json(data[0]);
});

// Delete a note
router.delete('/users/:username/notes/:noteId', isAuthor, async (req, res) => {
	const { data, error } = await supabase
		.from('notes')
		.delete()
		.match({ note_id: req.params.noteId });

	await supabase
		.from('notes_access_controle')
		.delete()
		.match({ note_id: req.params.noteId });

	if (error) throw new Error(error.message);

	return res.status(StatusCodes.OK).json(data[0]);
});

// Revision created and stored
router.post(
	// TODO
	'/users/:username/notes/:noteId/revisions',
	canWriteNote,
	async (req, res) => {
		const contentBefore = await supabase
			.from('notes')
			.select('current_content')
			.eq('note_id', req.params.noteId);

		const revision = await NotesService.createRevisionFromContentDifference(
			contentBefore,
			contentAfter,
		);

		if (error) throw new Error(error.message);

		return res.status(StatusCodes.CREATED).json({
			hash: revision.revision_id,
			timestap: revision.createdat,
			username: req.params.username,
			changes: req.body.changes,
			message: req.body.message,
		});
	},
);

module.exports = router;
