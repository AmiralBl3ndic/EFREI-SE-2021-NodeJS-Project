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
	const { data: data2, error: error2 } = await supabase
		.from('notes_access_control')
		.insert([
			{
				user_id: req.user.user_id,
				note: data[0].note_id,
				can_read: true,
				can_write: true,
			},
		]);

	if (error) throw error;
	if (error2) throw error2;

	return res.status(StatusCodes.CREATED).json({
		id: data[0].note_id,
		link: `/api/users/${req.params.username}/notes/${data[0].note_id}`,
		title: req.body.title,
	});
});

// Update the title of the note
router.patch('/users/:username/notes/:noteId', isAuthor, async (req, res) => {
	const { data, error } = await supabase
		.from('notes')
		.update({ title: req.body.title })
		.match({ note_id: req.params.noteId });

	if (error) throw error;

	return res.status(StatusCodes.OK).json(data[0]);
});

// Delete a note
router.delete('/users/:username/notes/:noteId', isAuthor, async (req, res) => {
	const { data, error } = await supabase
		.from('notes_access_control')
		.delete()
		.match({ note_id: req.params.noteId });

	const { data: data2, error: error2 } = await supabase
		.from('notes')
		.delete()
		.match({ note_id: req.params.noteId });

	if (error) throw error;
	if (error2) throw error2;

	return res.status(StatusCodes.OK).json(data[0]);
});

// Revision created and stored
router.post(
	'/users/:username/notes/:noteId/revisions',
	canWriteNote,
	async (req, res) => {
		// Retrieve content of the note
		const contentBefore = await supabase
			.from('notes')
			.select('current_content')
			.eq('note_id', req.params.noteId);

		// Retrieve the new content of the note
		const contentAfter = req.body.content;

		// Create a revision
		const revision = NotesService.getRevisionFromContentDifference(
			contentBefore[0],
			contentAfter,
			Date.now(),
		);

		// Check if the revision exist
		if (!revision) throw error;

		// Create the revision in supabase
		const { data, error } = await supabase.from('revisions').insert([
			{
				createdat: new Date(revision.timestamp).toISOString(),
				note: req.params.noteId,
			},
		]);

		// Check if the revision has been added
		if (error) throw error;

		const revisionId = data[0].revision_id;
		// Create modifications of the revision in supabase
		const toInsert = revision.modification.map((m) => ({
			position: m.position,
			previous: m.before,
			modified: m.after,
			revision: revisionId,
		}));

		const { data: data2, error: error2 } = await supabase
			.from('modifications')
			.insert(toInsert);

		// Check if the modification.s has/have been added
		if (error2) throw error;

		return res.status(StatusCodes.CREATED).json({
			hash: revisionId,
			timestap: data[0].createdat,
			username: req.params.username,
			contentAfter: contentAfter,
		});
	},
);

// Delete a note's specific revision
router.delete(
	'/users/:username/notes/:noteId/revisions/:revisionId',
	isAuthor,
	async (req, res) => {
		const { error } = await supabase
			.from('modifications')
			.delete()
			.match({ revision: req.params.revisionId });

		if (error) throw error;

		const { error: error2 } = await supabase
			.from('revisions')
			.delete()
			.match({ revision_id: req.params.revisionId });

		if (error2) throw error2;

		return res.status(StatusCodes.NO_CONTENT).send();
	},
);

// Retrieve note's revisions
router.get('/users/:username/notes/:noteId', isAuthor, async (req, res) => {
	const { data, error } = await supabase
		.from('revisions')
		.select('createdat, revision_id')
		.eq('note', req.params.noteId);

	if (error) throw error;

	var modification_data = [];

	for (id in data.revision_id) {
		const { data: data2, error: error2 } = await supabase
			.from('modifications')
			.select('modification_id,position,previous,modified')
			.eq('revision', id);
		modification_data.push(data2[0]);
	}

	if (error2) throw error2;

	return res.status(StatusCodes.OK).json({
		username: req.params.username,
		timestamp: data[0].createdat,
		content: modification_data,
	});
});

module.exports = router;
