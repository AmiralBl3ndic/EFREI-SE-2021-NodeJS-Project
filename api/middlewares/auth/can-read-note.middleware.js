const { StatusCodes } = require('http-status-codes');
const supabase = require('../../db');

/**
 * Checks whether the currently authenticated user can read a specific note
 * @param {uuid} noteId ID of the note to check reading rights of authenticated user
 */
const canReadNote = (noteId) => async (req, res, next) => {
	// Check if user is authenticated, reject if not
	if (!req.user)
		return res.status(StatusCodes.UNAUTHORIZED).json({
			resource: noteId,
		});

	// Retrieve note and access rights for user from database
	const { data, error } = await supabase
		.from('user_notes_with_rights')
		.select('can_read')
		.eq('username', req.user.username)
		.eq('note_id', noteId)
		.limit(1);

	if (error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();

	// If no results or if no reading rights
	if (data.length === 0 || !data[0].can_read)
		return res.status(StatusCodes.FORBIDDEN).json({
			resource: noteId,
		});

	next();
};

module.exports = canReadNote;
