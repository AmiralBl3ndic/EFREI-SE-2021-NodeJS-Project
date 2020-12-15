const { StatusCodes } = require('http-status-codes');
const supabase = require('../../db');

/**
 * Checks whether the currently authenticated user can write to a specific note
 */
const canWriteNote = async (req, res, next) => {
	// Check if user is authenticated, reject if not
	if (!req.user)
		return res.status(StatusCodes.UNAUTHORIZED).json({
			resource: noteId,
		});

	// Retrieve note and access rights for user from database
	const { data, error } = await supabase
		.from('user_notes_with_rights')
		.select('can_write')
		.eq('username', req.user.username)
		.eq('note_id', req.params.noteId)
		.limit(1);

	if (error) throw new Error(error.message);

	// If no results or if no writing rights
	if (data.length === 0 || !data[0].can_write)
		return res.status(StatusCodes.FORBIDDEN).json({
			resource: req.params.noteId,
		});

	next();
};

module.exports = canWriteNote;
