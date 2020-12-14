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
		.from('notes')
		.delete()
		.match({ note_id: req.params.noteId });

	await supabase
		.from('notes_access_controle')
		.delete()
		.match({ note_id: req.params.noteId });

	if (error) throw error;

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
				//TODO: @Theo To change after @Camille has change DB for createdat
				// It is to test the creation
				createdat: '2020-12-15T00:27:19+01:00',
				note: req.params.noteId,
			},
		]);

		// Check if the revision has been added
		if (error) throw error;

		// Create modifications of the revision in supabase
		for (let i = 0; i < revision.modification.length; i++) {
			const { data: data2, error: error2 } = await supabase
				.from('modifications')
				.insert([
					{
						position: revision.modification[i].position,
						previous: revision.modification[i].before,
						modified: revision.modification[i].after,
						revision: data[0].revision_id,
					},
				]);

			// Check if the modification.s has/have been added
			if (error2) throw error;
		}

		return res.status(StatusCodes.CREATED).json({
			hash: data[0].revision_id,
			timestap: data[0].createdat,
			username: req.params.username,
			contentAfter: contentAfter,
			message: req.body.message,
		});
	},
);

module.exports = router;
